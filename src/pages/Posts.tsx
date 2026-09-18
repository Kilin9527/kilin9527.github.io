import { useState } from 'react'
import PostCard from '../components/PostCard'
import { getAllTags, posts } from '../lib/posts'

export default function Posts() {
  const tags = getAllTags()
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const visible = activeTag
    ? posts.filter((post) => post.tags?.includes(activeTag))
    : posts

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
        文章
      </h1>
      <p className="mt-2 text-sm text-slate-500">共 {posts.length} 篇</p>

      {tags.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTag(null)}
            className={`rounded-full px-3 py-1 text-xs transition-colors ${
              activeTag === null
                ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'
            }`}
          >
            全部
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              className={`rounded-full px-3 py-1 text-xs transition-colors ${
                activeTag === tag
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      <div className="mt-4">
        {visible.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
