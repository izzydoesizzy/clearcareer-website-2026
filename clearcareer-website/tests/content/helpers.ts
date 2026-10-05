import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.resolve(__dirname, '../../src/content/blog');

export interface BlogPost {
  filename: string;
  filepath: string;
  slug: string;
}

export interface ParsedPost {
  data: Record<string, unknown>;
  content: string;
}

export const VALID_CATEGORIES = [
  'job-search-strategy',
  'resume-linkedin',
  'interviews',
  'salary-negotiation',
  'ai-tools-mindset',
  'announcement',
] as const;

export const VALID_TYPES = ['playbook', 'article'] as const;

// All known internal routes derived from src/pages/
export const KNOWN_ROUTES = new Set([
  '/',
  '/about',
  '/affiliates',
  '/blog',
  '/contact',
  '/free-tools',
  '/free-tools/contract-vs-salary-calculator',
  '/free-tools/financial-runway-calculator',
  '/free-tools/linkedin-job-search-builder',
  '/free-tools/linkedin-xray-search',
  '/free-tools/networking-message-builder',
  '/free-tools/opportunity-cost-calculator',
  '/free-tools/resume-bullet-scorer',
  '/free-tools/salary-negotiation-calculator',
  '/free-tools/star-story-builder',
  '/free-tools/weekly-job-search-planner',
  '/outcomes',
  '/playbooks',
  '/privacy',
  '/programs/community',
  '/programs/jsis',
  '/resources',
  '/terms',
  '/testimonials',
  '/tools',
]);

export function listBlogPosts(): BlogPost[] {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));
  return files.map((filename) => ({
    filename,
    filepath: path.join(BLOG_DIR, filename),
    slug: filename.replace(/\.mdx$/, ''),
  }));
}

export function parseFrontmatter(filepath: string): ParsedPost {
  const raw = fs.readFileSync(filepath, 'utf-8');
  const { data, content } = matter(raw);
  return { data, content };
}

export function readPostContent(filepath: string): string {
  const raw = fs.readFileSync(filepath, 'utf-8');
  const { content } = matter(raw);
  return content;
}

export function getAllBlogSlugs(): Set<string> {
  return new Set(listBlogPosts().map((p) => p.slug));
}
