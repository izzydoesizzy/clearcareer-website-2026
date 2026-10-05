import { describe, it, expect } from 'vitest';
import {
  listBlogPosts,
  parseFrontmatter,
  VALID_CATEGORIES,
  VALID_TYPES,
} from './helpers';

const posts = listBlogPosts();

describe('Blog Post Frontmatter', () => {
  it('found blog posts to test', () => {
    expect(posts.length).toBeGreaterThan(0);
  });

  describe.each(posts)('$filename', ({ filepath, filename }) => {
    const { data } = parseFrontmatter(filepath);

    it('has a title', () => {
      expect(data.title).toBeDefined();
      expect(typeof data.title).toBe('string');
      expect((data.title as string).trim().length).toBeGreaterThan(0);
    });

    it('has a description', () => {
      expect(data.description).toBeDefined();
      expect(typeof data.description).toBe('string');
      expect((data.description as string).trim().length).toBeGreaterThan(0);
    });

    it('has a valid publishDate (YYYY-MM-DD format)', () => {
      expect(data.publishDate).toBeDefined();
      const dateStr = data.publishDate as string;
      expect(dateStr).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      const parsed = new Date(dateStr);
      expect(parsed.toString()).not.toBe('Invalid Date');
    });

    it('has a valid category', () => {
      const category = data.category as string | undefined;
      if (category !== undefined) {
        expect(VALID_CATEGORIES).toContain(category);
      }
    });

    it('has a valid type', () => {
      const type = data.type as string | undefined;
      if (type !== undefined) {
        expect(VALID_TYPES).toContain(type);
      }
    });

    it('title is between 10-120 characters', () => {
      const title = data.title as string;
      expect(title.length).toBeGreaterThanOrEqual(10);
      expect(title.length).toBeLessThanOrEqual(120);
    });

    it('description is between 50-300 characters', () => {
      const desc = data.description as string;
      expect(desc.length).toBeGreaterThanOrEqual(50);
      expect(desc.length).toBeLessThanOrEqual(300);
    });

    it('has at least one tag', () => {
      const tags = data.tags as string[] | undefined;
      expect(tags).toBeDefined();
      expect(Array.isArray(tags)).toBe(true);
      expect(tags!.length).toBeGreaterThan(0);
    });

    it('tags are non-empty strings', () => {
      const tags = data.tags as string[] | undefined;
      if (tags) {
        for (const tag of tags) {
          expect(typeof tag).toBe('string');
          expect(tag.trim().length).toBeGreaterThan(0);
        }
      }
    });

    it('featured is a boolean if present', () => {
      if (data.featured !== undefined) {
        expect(typeof data.featured).toBe('boolean');
      }
    });

    it('draft is a boolean if present', () => {
      if (data.draft !== undefined) {
        expect(typeof data.draft).toBe('boolean');
      }
    });
  });
});
