import { getAllPosts, getAllTags } from "@/lib/posts"
import { BlogLayout } from "@/components/blog-layout"

export default async function HomePage() {
  const allPosts = await getAllPosts()
  const allTags = await getAllTags()

  return <BlogLayout posts={allPosts} tags={allTags} />
}
