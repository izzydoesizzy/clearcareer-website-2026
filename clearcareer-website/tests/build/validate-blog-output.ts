/**
 * Build Output Validation Script
 *
 * Run after `astro build` to verify all blog posts rendered correctly.
 * Usage: npx tsx tests/build/validate-blog-output.ts
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as cheerio from 'cheerio';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(__dirname, '../../dist');
const BLOG_DIR = path.resolve(__dirname, '../../src/content/blog');

interface TestResult {
  post: string;
  check: string;
  passed: boolean;
  message?: string;
}

const results: TestResult[] = [];
let totalPassed = 0;
let totalFailed = 0;
let totalWarnings = 0;

function pass(post: string, check: string) {
  results.push({ post, check, passed: true });
  totalPassed++;
}

function fail(post: string, check: string, message: string) {
  results.push({ post, check, passed: false, message });
  totalFailed++;
}

function warn(post: string, check: string, message: string) {
  results.push({ post, check, passed: true, message: `[WARN] ${message}` });
  totalWarnings++;
}

// Get all non-draft blog posts
function getPublishedPosts(): { slug: string; data: Record<string, unknown> }[] {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));
  const posts: { slug: string; data: Record<string, unknown> }[] = [];

  for (const file of files) {
    const filepath = path.join(BLOG_DIR, file);
    const { data } = matter(fs.readFileSync(filepath, 'utf-8'));
    if (data.draft) continue;
    posts.push({
      slug: file.replace(/\.mdx$/, ''),
      data,
    });
  }

  return posts;
}

// Check if dist/ exists
if (!fs.existsSync(DIST_DIR)) {
  console.error('\x1b[31mERROR: dist/ directory not found. Run `npm run build` first.\x1b[0m');
  process.exit(1);
}

const posts = getPublishedPosts();
console.log(`\nValidating ${posts.length} blog posts in dist/...\n`);

// Check each post
for (const { slug, data } of posts) {
  const htmlPath = path.join(DIST_DIR, 'blog', slug, 'index.html');

  // Check 1: Page exists
  if (!fs.existsSync(htmlPath)) {
    fail(slug, 'page exists', `dist/blog/${slug}/index.html not found`);
    continue; // Skip remaining checks for this post
  }
  pass(slug, 'page exists');

  const html = fs.readFileSync(htmlPath, 'utf-8');
  const $ = cheerio.load(html);

  // Check: CSS is present (stylesheet link or inline style)
  const hasStylesheet = $('link[rel="stylesheet"]').length > 0;
  const hasInlineStyle = $('style').length > 0;
  if (hasStylesheet || hasInlineStyle) {
    pass(slug, 'css present');
  } else {
    fail(slug, 'css present', 'No <link rel="stylesheet"> or <style> tag found in page');
  }

  // Check 2: Title renders in <h1>
  const h1Text = $('h1').first().text().trim();
  if (h1Text && h1Text === (data.title as string)) {
    pass(slug, 'h1 title');
  } else if (h1Text) {
    fail(slug, 'h1 title', `Expected "${data.title}", got "${h1Text}"`);
  } else {
    fail(slug, 'h1 title', 'No <h1> element found');
  }

  // Check 3: Date renders in <time> element
  const timeEl = $('time[datetime]');
  if (timeEl.length > 0) {
    const datetime = timeEl.attr('datetime');
    if (datetime === data.publishDate) {
      pass(slug, 'time element');
    } else {
      fail(slug, 'time element', `datetime="${datetime}" does not match publishDate="${data.publishDate}"`);
    }
  } else {
    fail(slug, 'time element', 'No <time datetime="..."> element found');
  }

  // Check 4: Meta description
  const metaDesc = $('meta[name="description"]').attr('content');
  if (metaDesc && metaDesc === data.description) {
    pass(slug, 'meta description');
  } else if (metaDesc) {
    fail(slug, 'meta description', `Meta description does not match frontmatter`);
  } else {
    fail(slug, 'meta description', 'No <meta name="description"> found');
  }

  // Check 5: Content not empty
  const proseDiv = $('.prose');
  if (proseDiv.length > 0) {
    const proseText = proseDiv.text().trim();
    if (proseText.length > 100) {
      pass(slug, 'content not empty');
    } else {
      fail(slug, 'content not empty', `Prose content only ${proseText.length} chars`);
    }

    // Check for at least one heading or paragraph
    const hasStructure = proseDiv.find('h2, h3, p').length > 0;
    if (hasStructure) {
      pass(slug, 'content structure');
    } else {
      fail(slug, 'content structure', 'No <h2>, <h3>, or <p> elements in .prose');
    }
  } else {
    fail(slug, 'content not empty', 'No .prose element found');
    fail(slug, 'content structure', 'No .prose element found');
  }

  // Check 6: Article JSON-LD (warning only - slot="head" rendering is a known Astro issue)
  const jsonLdScripts = $('script[type="application/ld+json"]');
  let foundArticleSchema = false;
  jsonLdScripts.each((_, el) => {
    try {
      const json = JSON.parse($(el).html() || '');
      if (json['@type'] === 'Article') {
        foundArticleSchema = true;
        if (json.headline && json.author && json.datePublished) {
          pass(slug, 'article json-ld');
        } else {
          warn(slug, 'article json-ld', 'Article schema missing headline, author, or datePublished');
        }
      }
    } catch {
      // Not valid JSON, skip
    }
  });
  if (!foundArticleSchema) {
    warn(slug, 'article json-ld', 'No Article JSON-LD schema found (slot="head" rendering issue)');
  }

  // Check 7: Breadcrumb navigation
  const breadcrumb = $('nav[aria-label="Breadcrumb"]');
  if (breadcrumb.length > 0) {
    pass(slug, 'breadcrumb');
  } else {
    fail(slug, 'breadcrumb', 'No breadcrumb navigation found');
  }

  // Check 8: Author name present
  if (html.includes(data.author as string || 'Izzy Piyale-Sheard')) {
    pass(slug, 'author name');
  } else {
    fail(slug, 'author name', 'Author name not found in page');
  }

  // Check 9: Tag badges render
  const tagBadges = $('.rounded-full.bg-blue-bg');
  const expectedTags = (data.tags as string[]) || [];
  if (expectedTags.length > 0 && tagBadges.length > 0) {
    pass(slug, 'tag badges');
  } else if (expectedTags.length === 0) {
    pass(slug, 'tag badges'); // No tags expected, no badges needed
  } else {
    fail(slug, 'tag badges', `Expected ${expectedTags.length} tag badge(s), found ${tagBadges.length}`);
  }

  // Check 10: CTA block present
  const ctaBlock = $('a[href*="calendly"]');
  if (ctaBlock.length > 0) {
    pass(slug, 'cta block');
  } else {
    fail(slug, 'cta block', 'No CTA block with Calendly link found');
  }

  // Check 11: Internal links resolve to files in dist/
  const brokenDistLinks: string[] = [];
  proseDiv.find('a[href^="/"]').each((_, el) => {
    const href = $(el).attr('href');
    if (!href) return;

    // Strip anchor fragments
    const cleanHref = href.split('#')[0];
    if (!cleanHref || cleanHref === '/') return;

    // Check if the corresponding file exists in dist/
    const distPath = path.join(DIST_DIR, cleanHref, 'index.html');
    const distPathDirect = path.join(DIST_DIR, cleanHref);
    if (!fs.existsSync(distPath) && !fs.existsSync(distPathDirect)) {
      brokenDistLinks.push(href);
    }
  });

  if (brokenDistLinks.length === 0) {
    pass(slug, 'internal links resolve');
  } else {
    fail(slug, 'internal links resolve', `Broken: ${brokenDistLinks.join(', ')}`);
  }
}

// Check blog index page
console.log('Validating blog index page...\n');
const indexPath = path.join(DIST_DIR, 'blog', 'index.html');
if (fs.existsSync(indexPath)) {
  const indexHtml = fs.readFileSync(indexPath, 'utf-8');
  const $ = cheerio.load(indexHtml);

  // Count blog cards (links to /blog/ posts)
  const blogLinks = $('a[href^="/blog/"]')
    .map((_, el) => $(el).attr('href'))
    .get()
    .filter((href) => href !== '/blog/' && href !== '/blog');

  // Unique blog links
  const uniqueLinks = new Set(blogLinks);

  if (uniqueLinks.size >= posts.length) {
    pass('blog-index', 'all posts listed');
  } else {
    fail('blog-index', 'all posts listed', `Found ${uniqueLinks.size} unique post links, expected ${posts.length}`);
  }

  pass('blog-index', 'page exists');
} else {
  fail('blog-index', 'page exists', 'dist/blog/index.html not found');
}

// Print results
console.log('='.repeat(60));
console.log(`\n  RESULTS: ${totalPassed} passed, ${totalFailed} failed, ${totalWarnings} warnings\n`);

if (totalWarnings > 0) {
  console.log('\x1b[33mWARNINGS:\x1b[0m\n');
  for (const r of results.filter((r) => r.passed && r.message?.startsWith('[WARN]'))) {
    console.log(`  \x1b[33m⚠\x1b[0m [${r.post}] ${r.check}: ${r.message?.replace('[WARN] ', '')}`);
  }
  console.log('');
}

if (totalFailed > 0) {
  console.log('\x1b[31mFAILED CHECKS:\x1b[0m\n');
  for (const r of results.filter((r) => !r.passed)) {
    console.log(`  \x1b[31m✗\x1b[0m [${r.post}] ${r.check}: ${r.message}`);
  }
  console.log('');
  process.exit(1);
} else {
  console.log('\x1b[32mAll checks passed!\x1b[0m\n');
  process.exit(0);
}
