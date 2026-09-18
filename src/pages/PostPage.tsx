import { Link, useParams } from 'react-router'
import { getPost } from '../lib/posts'
import { formatDate } from '../lib/site'
import NotFound from './NotFound'

export default function PostPage() {
  const { slug } = useParams()
  const post = slug ? getPost(slug) : undefined

  if (!post) {
    return <NotFound />
  }

  const { Component } = post

  return (
    <article>
      <Link
        to="/posts"
        className="text-sm text-sky-600 hover:underline dark:text-sky-400"
      >
        ← 返回文章列表
      </Link>

      <header className="mt-6 border-b border-slate-200/80 pb-6 dark:border-slate-800/80">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          {post.title}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-500">
          {post.date && <time dateTime={post.date}>{formatDate(post.date)}</time>}
          {post.tags && post.tags.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>

      <div className="prose prose-slate mt-8 max-w-none dark:prose-invert">
        <Component />
      </div>
    </article>
  )
}
