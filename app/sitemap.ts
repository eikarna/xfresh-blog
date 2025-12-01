import { getAllPosts } from "@/lib/posts"
import type { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts()
  const siteUrl = "https://xfresh-blog.vercel.app" // Replace with your domain

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => {
    const date = new Date(post.date);
    const url = `${siteUrl}/blog/${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${post.slug}`;
    return {
      url,
      lastModified: new Date(post.date),
      changeFrequency: "weekly",
      priority: 0.8,
    };
  });

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...postEntries,
  ]
}
