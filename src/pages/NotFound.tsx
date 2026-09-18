import { Link } from 'react-router'

export default function NotFound() {
  return (
    <div className="py-16 text-center">
      <p className="text-sm font-medium text-slate-500">404</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
        找不到这个页面
      </h1>
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
        链接可能已经失效，或者这篇文章还没写。
      </p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
      >
        回到首页
      </Link>
    </div>
  )
}
