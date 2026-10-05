import { getCollection } from "astro:content";
import { OGImageRoute } from "astro-og-canvas";
import { getCategoryMeta } from "../../utils/category-meta";

const blogPosts = await getCollection("blog", ({ data }) => !data.draft);

const pages: Record<string, { title: string; description: string }> = {
  // Default OG image for non-blog pages
  default: {
    title: "ClearCareer",
    description: "Career coaching that gets results. 200+ professionals coached. $1.2M+ in collective raises.",
  },
  // Per-section OG images
  about: {
    title: "Meet Izzy Piyale-Sheard",
    description: "Career coach, community builder, and the person behind ClearCareer.",
  },
  "programs-jsis": {
    title: "Job Search Ignition System",
    description: "8-week done-with-you career accelerator for $100K+ professionals.",
  },
  "free-tools": {
    title: "Free Career Tools",
    description: "Calculators, builders, and planners to power your job search.",
  },
  // Blog post OG images
  ...Object.fromEntries(
    blogPosts.map(({ id, data }) => [
      id,
      {
        title: data.title,
        description: getCategoryMeta(data.category).label,
      },
    ])
  ),
};

export const { getStaticPaths, GET } = await OGImageRoute({
  param: "route",
  pages,
  getImageOptions: (_path, page) => ({
    title: page.title,
    description: page.description,
    logo: {
      path: "./public/images/logo/clearcareer-logo.png",
      size: [80],
    },
    fonts: [
      "./public/fonts/Inter-Regular.ttf",
      "./public/fonts/Inter-Bold.ttf",
    ],
    bgGradient: [
      [1, 97, 239],
      [3, 6, 32],
    ],
    border: {
      color: [1, 97, 239],
      width: 10,
      side: "inline-start",
    },
    padding: 60,
    font: {
      title: {
        families: ["Inter"],
        weight: "Bold",
        size: 60,
        color: [255, 255, 255],
        lineHeight: 1.2,
      },
      description: {
        families: ["Inter"],
        weight: "Normal",
        size: 28,
        color: [200, 220, 255],
        lineHeight: 1.4,
      },
    },
  }),
});
