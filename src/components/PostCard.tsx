import { Link } from 'react-router'
import type { Post } from '../lib/posts'
import { formatDate } from '../lib/site'

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="border-b border-slate-200/80 py-6 last:border-0 dark:border-slate-800/80">
      <Link to={`/posts/${post.slug}`} className="group block">
        <h3 className="text-lg font-semibold text-slate-900 transition-colors group-hover:text-sky-600 dark:text-slate-100 dark:group-hover:text-sky-400">
          {post.title}
        </h3>
        {post.date && (
          <time
            dateTime={post.date}
            className="mt-1 block text-sm text-slate-500"
          >
            {formatDate(post.date)}
          </time>
        )}
        {post.summary && (
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            {post.summary}
          </p>
        )}
        {post.tags && post.tags.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-2">
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
      </Link>
    </article>
  )
}
