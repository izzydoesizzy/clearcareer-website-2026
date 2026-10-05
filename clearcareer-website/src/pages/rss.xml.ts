import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async (context) => {
  const posts = await getCollection('blog', ({ data }) => !data.draft);

  const sortedPosts = posts.sort(
    (a, b) => new Date(b.data.publishDate).getTime() - new Date(a.data.publishDate).getTime()
  );

  return rss({
    title: 'ClearCareer Blog',
    description: 'Career strategies, job search tactics, and salary negotiation tips from ClearCareer.',
    site: context.site?.toString() ?? 'https://joinclearcareer.com',
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.publishDate),
      description: post.data.description,
      link: `/blog/${post.id}/`,
      author: post.data.author,
    })),
    customData: '<language>en-us</language>',
  });
};
