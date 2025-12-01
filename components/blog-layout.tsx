"use client"

import { useState } from "react"
import { PostCard } from "@/components/post-card"
import { Tag } from "@/components/tag"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { Post } from "@/lib/types"
import { Search } from "lucide-react"
import Link from "next/link"

interface BlogLayoutProps {
  posts: Post[]
  tags: string[]
}

export function BlogLayout({ posts, tags }: BlogLayoutProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const featuredPost = posts[0]
  const latestPosts = posts.slice(1)

  const filteredPosts = posts.filter((post) => {
    const term = searchTerm.toLowerCase()
    const inTitle = post.title?.toLowerCase().includes(term) ?? false
    const inExcerpt = post.excerpt?.toLowerCase().includes(term) ?? false
    const inTags =
      post.tags?.some((tag) => tag.toLowerCase().includes(term)) ?? false
    return inTitle || inExcerpt || inTags
  })

  return (
    <div className="space-y-12">
      <section className="text-center py-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Selamat Datang di Blog XFresh</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
          Tips, Berita, dan Inovasi Seputar Kebersihan Helm & Gaya Hidup Pengendara.
        </p>
        <Link href="https://www.xfresh.id" passHref legacyBehavior>
          <a target="_blank" rel="noopener noreferrer">
            <Button>Kunjungi Situs Utama XFresh</Button>
          </a>
        </Link>
      </section>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Cari artikel..."
          className="w-full pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {searchTerm ? (
        <section>
          <h2 className="text-2xl font-bold mb-6">Hasil Pencarian</h2>
          {filteredPosts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p>Artikel tidak ditemukan. Silakan coba kata kunci lain.</p>
          )}
        </section>
      ) : (
        <>
          {featuredPost && (
            <section>
              <h2 className="text-2xl font-bold mb-6 border-b pb-2">Artikel Unggulan</h2>
              <PostCard post={featuredPost} isFeatured />
            </section>
          )}

          <section>
            <h2 className="text-2xl font-bold mb-6 border-b pb-2">Artikel Terbaru</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 border-b pb-2">Jelajahi Tag</h2>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Tag key={tag} tag={tag} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  )
}
