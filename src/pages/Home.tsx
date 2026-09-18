import { Link } from 'react-router'
import PostCard from '../components/PostCard'
import { posts } from '../lib/posts'
import { site } from '../lib/site'

export default function Home() {
  const recent = posts.slice(0, 3)

  return (
    <div>
      <section className="pb-12">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
          你好，我是 {site.author}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
          {site.description}
        </p>
        {/* <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/posts"
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
          >
            阅读文章
          </Link>
          <Link
            to="/about"
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            关于我
          </Link>
        </div> */}
      </section>

      <section>
        <div className="flex items-baseline justify-between">
          <h2 className="text-sm font-medium tracking-wide text-slate-500 uppercase">
            最新文章
          </h2>
          <Link
            to="/posts"
            className="text-sm text-sky-600 hover:underline dark:text-sky-400"
          >
            全部 →
          </Link>
        </div>
        <div className="mt-2">
          {recent.length === 0 ? (
            <p className="py-6 text-sm text-slate-500">
              还没有文章。在 <code>src/posts/</code> 下新建一个 .mdx 文件即可。
            </p>
          ) : (
            recent.map((post) => <PostCard key={post.slug} post={post} />)
          )}
        </div>
      </section>
    </div>
  )
}
