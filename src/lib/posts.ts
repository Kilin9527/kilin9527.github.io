import type { ComponentType } from 'react'

export type PostFrontmatter = {
  title: string
  date: string
  summary?: string
  tags?: string[]
}

export type Post = PostFrontmatter & {
  slug: string
  Component: ComponentType
}

type MdxModule = {
  default: ComponentType
  frontmatter?: Partial<PostFrontmatter>
}

// Every .mdx file in src/posts becomes a post. Adding a file is all it takes —
// no index to update. `eager: true` bundles them all up front, which is fine
// for a personal blog; drop it and use lazy() if the post count grows large.
const modules = import.meta.glob<MdxModule>('../posts/*.mdx', { eager: true })

export const posts: Post[] = Object.entries(modules)
  .map(([path, mod]) => {
    const slug = path.split('/').pop()!.replace(/\.mdx$/, '')
    const frontmatter = mod.frontmatter ?? {}
    return {
      slug,
      title: frontmatter.title ?? slug,
      date: frontmatter.date ?? '',
      summary: frontmatter.summary,
      tags: frontmatter.tags ?? [],
      Component: mod.default,
    }
  })
  // Newest first. ISO YYYY-MM-DD strings sort correctly lexicographically.
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug)
}

export function getAllTags(): string[] {
  return [...new Set(posts.flatMap((post) => post.tags ?? []))].sort()
}
