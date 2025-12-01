import { getPostBySlug, getAllPosts } from "@/lib/posts"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Image from "next/image"
import { Tag } from "@/components/tag"
import { JsonLd } from "@/components/json-ld"
import { DisqusComments } from "@/components/disqus-comments"

type Props = {
  params: {
    year: string
    month: string
    day: string
    slug: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return {}
  }

  const url = `https://xfresh-blog.vercel.app/blog/${params.year}/${params.month}/${params.day}/${post.slug}`

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: url,
      images: [
        {
          url: post.cover_image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.cover_image],
    },
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => {
    const date = new Date(post.date)
    // Ensure date is valid before generating params
    if (isNaN(date.getTime())) {
      console.error(`Invalid date for post slug: ${post.slug}`);
      return null;
    }
    return {
      year: date.getFullYear().toString(),
      month: (date.getMonth() + 1).toString().padStart(2, '0'),
      day: date.getDate().toString().padStart(2, '0'),
      slug: post.slug,
    }
  }).filter(Boolean); // Filter out any nulls from invalid dates
}

export default async function PostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const postDate = new Date(post.date);
  // Validate that the URL date matches the post's metadata date
  if (
    isNaN(postDate.getTime()) ||
    postDate.getFullYear().toString() !== params.year ||
    (postDate.getMonth() + 1).toString().padStart(2, '0') !== params.month ||
    postDate.getDate().toString().padStart(2, '0') !== params.day
  ) {
    notFound();
  }

  const postUrl = `https://xfresh-blog.vercel.app/blog/${params.year}/${params.month}/${params.day}/${post.slug}`

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    image: post.cover_image,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "XFresh Blog",
      logo: {
        "@type": "ImageObject",
        url: "/images/logo.png",
      },
    },
    description: post.excerpt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
  }

  const disqusConfig = {
    url: postUrl,
    identifier: post.slug,
    title: post.title
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <article className="prose prose-lg dark:prose-invert mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">{post.title}</h1>
          <div className="flex items-center space-x-4 text-muted-foreground text-lg">
            <div className="flex items-center space-x-2">
              <Image src={post.author_image} alt={post.author} width={28} height={28} className="rounded-full" />
              <span>{post.author}</span>
            </div>
            <span>•</span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Tag key={tag} tag={tag} />
            ))}
          </div>
        </header>
        <Image
          src={post.cover_image || "/placeholder.svg"}
          alt={`Cover image for ${post.title}`}
          width={1200}
          height={630}
          className="rounded-lg mb-8"
          priority
        />
        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>

      <div className="max-w-prose mx-auto">
        <DisqusComments shortname="xfresh-blog" config={disqusConfig} />
      </div>
    </>
  )
}