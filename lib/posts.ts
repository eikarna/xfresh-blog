import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import remarkMath from "remark-math"
import remarkRehype from "remark-rehype"
import rehypeKatex from "rehype-katex"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeStringify from "rehype-stringify"
import rehypeRaw from "rehype-raw"
import { visit } from "unist-util-visit"
import type { Element, Root } from "hast"
import { cache } from "react"
import type { Post } from "./types"

const postsDirectory = path.join(process.cwd(), "content/posts")

// Custom Rehype plugin to wrap KaTeX elements
const rehypeWrapKatex = () => {
  return (tree: Root) => {
    visit(tree, "element", (node: Element, index, parent: Element | Root | null) => {
      if (
        parent &&
        typeof index === "number" &&
        node.properties?.className?.includes("katex-display")
      ) {
        const wrapper = {
          type: "element",
          tagName: "div",
          properties: { className: ["katex-container"] },
          children: [node],
        }
        // @ts-ignore
        parent.children[index] = wrapper
      }
    })
  }
}

export const getPostSlugs = () => {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map((fileName) => fileName.replace(/\.mdx?$/, ""))
}

export const getPostBySlug = cache(async (slug: string): Promise<Post | null> => {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`)
  if (!fs.existsSync(fullPath)) {
    return null
  }
  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)

  const processedContent = await remark()
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw) // Parse HTML strings from Markdown
    .use(rehypeKatex)
    .use(rehypeWrapKatex) // Our custom plugin
    .use(rehypePrettyCode, {
      theme: {
        light: "github-light",
        dark: "github-dark",
      },
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content)

  const contentHtml = processedContent.toString()

  return {
    slug,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt,
    cover_image: data.cover_image,
    tags: data.tags,
    contentHtml,
    author: data.author || 'XFresh Team',
    author_image: data.author_image || '/images/placeholder-user.jpg',
  }
})

export const getAllPosts = cache(async (): Promise<Post[]> => {
  const slugs = getPostSlugs()
  const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug)))

  const validPosts = posts.filter((post): post is Post => post !== null)

  return validPosts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
})

export const getAllTags = cache(async (): Promise<string[]> => {
  const posts = await getAllPosts()
  const allTags = new Set<string>()
  posts.forEach((post) => {
    post.tags.forEach((tag) => allTags.add(tag))
  })
  return Array.from(allTags)
})

export const getPostsByTag = cache(async (tag: string): Promise<Post[]> => {
  const posts = await getAllPosts()
  return posts.filter((post) => post.tags.includes(tag))
})
