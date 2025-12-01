import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tag } from "./tag"
import type { Post } from "@/lib/types"
import { cn } from "@/lib/utils"

interface PostCardProps {
  post: Post
  isFeatured?: boolean
}

export function PostCard({ post, isFeatured = false }: PostCardProps) {
  return (
    <Card className={cn("h-full overflow-hidden transition-all hover:shadow-lg group", isFeatured && "lg:flex")}>
      <div className={cn("relative", isFeatured && "lg:w-1/2")}>
        <Link href={`/blog/${new Date(post.date).getFullYear()}/${(new Date(post.date).getMonth() + 1).toString().padStart(2, '0')}/${new Date(post.date).getDate().toString().padStart(2, '0')}/${post.slug}`} aria-label={`Read more about ${post.title}`}>
          <Image
            src={post.cover_image || "/placeholder.svg"}
            alt={`Cover image for ${post.title}`}
            width={isFeatured ? 800 : 400}
            height={isFeatured ? 450 : 225}
            className="w-full object-cover"
          />
        </Link>
      </div>
      <div className={cn("flex flex-col", isFeatured && "lg:w-1/2")}>
        <CardHeader>
          <CardTitle className={cn("leading-snug", isFeatured ? "text-3xl" : "text-xl")}>
            <Link href={`/blog/${new Date(post.date).getFullYear()}/${(new Date(post.date).getMonth() + 1).toString().padStart(2, '0')}/${new Date(post.date).getDate().toString().padStart(2, '0')}/${post.slug}`} className="group-hover:text-primary transition-colors">
              {post.title}
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
        </CardContent>
        <CardFooter className="flex-col items-start gap-4">
          <div className="text-sm text-muted-foreground">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Tag key={tag} tag={tag} />
            ))}
          </div>
        </CardFooter>
      </div>
    </Card>
  )
}
