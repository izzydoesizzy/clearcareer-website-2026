import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import {
  listBlogPosts,
  readPostContent,
  getAllBlogSlugs,
  KNOWN_ROUTES,
} from './helpers';

const posts = listBlogPosts();
const allSlugs = getAllBlogSlugs();

describe('Blog Post Content Quality', () => {
  describe.each(posts)('$filename', ({ filepath, filename }) => {
    const content = readPostContent(filepath);

    it('contains no em dashes (Unicode \\u2014)', () => {
      const emDashPositions: number[] = [];
      for (let i = 0; i < content.length; i++) {
        if (content[i] === '\u2014') {
          emDashPositions.push(i);
        }
      }
      if (emDashPositions.length > 0) {
        // Find the line numbers for context
        const lines = content.split('\n');
        const offendingLines: string[] = [];
        for (const line of lines) {
          if (line.includes('\u2014')) {
            offendingLines.push(line.trim());
          }
        }
        expect.fail(
          `Found ${emDashPositions.length} em dash(es) in ${filename}:\n${offendingLines.map((l) => `  > ${l}`).join('\n')}`
        );
      }
    });

    it('contains no HTML em dash entities (&mdash;)', () => {
      expect(content).not.toContain('&mdash;');
    });

    it('internal blog links point to existing posts', () => {
      // Match markdown links like [text](/blog/some-slug) or [text](/blog/some-slug/)
      const blogLinkRegex = /\]\(\/blog\/([a-z0-9-]+)\/?(?:#[a-z0-9-]*)?\)/g;
      let match;
      const brokenLinks: string[] = [];

      while ((match = blogLinkRegex.exec(content)) !== null) {
        const slug = match[1];
        if (!allSlugs.has(slug)) {
          brokenLinks.push(`/blog/${slug}`);
        }
      }

      if (brokenLinks.length > 0) {
        expect.fail(
          `Found ${brokenLinks.length} broken blog link(s) in ${filename}:\n${brokenLinks.map((l) => `  > ${l}`).join('\n')}`
        );
      }
    });

    it('internal page links point to known routes', () => {
      // Match markdown links to non-blog internal pages like [text](/tools) or [text](/programs/jsis)
      const pageLinkRegex = /\]\((\/(?!blog\/)[a-z0-9-]+(?:\/[a-z0-9-]+)*)\/?(?:#[a-z0-9-]*)?\)/g;
      let match;
      const brokenLinks: string[] = [];

      while ((match = pageLinkRegex.exec(content)) !== null) {
        const route = match[1];
        // Skip external-looking paths and anchor-only links
        if (route.startsWith('/http') || route === '/') continue;
        if (!KNOWN_ROUTES.has(route)) {
          brokenLinks.push(route);
        }
      }

      if (brokenLinks.length > 0) {
        expect.fail(
          `Found ${brokenLinks.length} broken page link(s) in ${filename}:\n${brokenLinks.map((l) => `  > ${l}`).join('\n')}`
        );
      }
    });

    it('MDX imports reference existing files', () => {
      // Match import statements like: import Coach from '@components/blog/Coach.astro'
      const importRegex = /^import\s+\w+\s+from\s+['"]([^'"]+)['"]/gm;
      let match;
      const brokenImports: string[] = [];

      while ((match = importRegex.exec(content)) !== null) {
        const importPath = match[1];
        // Resolve @ aliases
        let resolvedPath = importPath;
        if (resolvedPath.startsWith('@components/')) {
          resolvedPath = resolvedPath.replace('@components/', 'src/components/');
        } else if (resolvedPath.startsWith('@layouts/')) {
          resolvedPath = resolvedPath.replace('@layouts/', 'src/layouts/');
        } else if (resolvedPath.startsWith('@data/')) {
          resolvedPath = resolvedPath.replace('@data/', 'src/data/');
        } else if (resolvedPath.startsWith('@utils/')) {
          resolvedPath = resolvedPath.replace('@utils/', 'src/utils/');
        } else if (resolvedPath.startsWith('@/')) {
          resolvedPath = resolvedPath.replace('@/', 'src/');
        } else {
          // Relative import or package import - skip package imports
          if (!resolvedPath.startsWith('.')) continue;
          resolvedPath = path.resolve(path.dirname(filepath), resolvedPath);
          if (fs.existsSync(resolvedPath)) continue;
          brokenImports.push(importPath);
          continue;
        }

        const fullPath = path.resolve(__dirname, '../../', resolvedPath);
        if (!fs.existsSync(fullPath)) {
          brokenImports.push(importPath);
        }
      }

      if (brokenImports.length > 0) {
        expect.fail(
          `Found ${brokenImports.length} broken import(s) in ${filename}:\n${brokenImports.map((l) => `  > ${l}`).join('\n')}`
        );
      }
    });

    it('has no unused component imports', () => {
      // Match import statements like: import Coach from '@components/blog/Coach.astro'
      const importRegex = /^import\s+(\w+)\s+from\s+['"][^'"]+['"]/gm;
      let match;
      const unusedImports: string[] = [];

      while ((match = importRegex.exec(content)) !== null) {
        const componentName = match[1];
        // Check if the component is used as a JSX tag in the content
        const usageRegex = new RegExp(`<${componentName}[\\s>\/]`);
        if (!usageRegex.test(content)) {
          unusedImports.push(componentName);
        }
      }

      if (unusedImports.length > 0) {
        expect.fail(
          `Found ${unusedImports.length} unused import(s) in ${filename}: ${unusedImports.join(', ')}. Remove unused imports to prevent CSS loading issues.`
        );
      }
    });

    it('has substantive content (more than 150 words)', () => {
      // Strip MDX/JSX tags and count words
      const textContent = content
        .replace(/import\s+.*from\s+['"].*['"]/g, '') // remove imports
        .replace(/<[^>]+>/g, '') // remove HTML/JSX tags
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // convert links to text
        .replace(/[#*_`|>-]/g, ' ') // remove markdown syntax
        .trim();
      const wordCount = textContent.split(/\s+/).filter((w) => w.length > 0).length;
      expect(wordCount).toBeGreaterThan(150);
    });
  });
});
