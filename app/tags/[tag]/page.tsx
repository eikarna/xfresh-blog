import { getPostsByTag, getAllTags } from "@/lib/posts"
import { PostCard } from "@/components/post-card"
import type { Metadata } from "next"

type Props = {
  params: { tag: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = decodeURIComponent(params.tag)
  return {
    title: `Posts tagged with "${tag}"`,
    description: `Find all blog posts tagged with "${tag}".`,
    alternates: {
      canonical: `/tags/${tag}`,
    },
  }
}

export async function generateStaticParams() {
  const tags = await getAllTags()
  return tags.map((tag) => ({
    tag: tag,
  }))
}

export default async function TagPage({ params }: Props) {
  const tag = decodeURIComponent(params.tag)
  const posts = await getPostsByTag(tag)

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold">
          Posts tagged with: <span className="text-primary">{tag}</span>
        </h1>
      </header>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
