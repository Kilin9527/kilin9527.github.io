import { Link, NavLink, Outlet } from 'react-router'
import { site } from '../lib/site'
import ThemeToggle from './ThemeToggle'

const navItems = [
  { to: '/', label: '首页', end: true },
  { to: '/posts', label: '文章', end: false },
  { to: '/about', label: '关于', end: false },
]

export default function Layout() {
  return (
    <div className="flex min-h-svh flex-col bg-white text-slate-700 dark:bg-slate-950 dark:text-slate-300">
      <header className="sticky top-0 z-10 border-b border-slate-200/80 bg-white/80 backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/80">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between gap-4 px-6">
          <Link
            to="/"
            className="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-100"
          >
            {site.title}
          </Link>

          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `rounded-md px-3 py-1.5 text-sm transition-colors ${
                    isActive
                      ? 'bg-slate-100 font-medium text-slate-900 dark:bg-slate-800 dark:text-slate-100'
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200/80 dark:border-slate-800/80">
        <div className="mx-auto flex max-w-3xl flex-col gap-2 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.author}
          </p>
          <div className="flex gap-4">
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-slate-900 dark:hover:text-slate-200"
            >
              GitHub
            </a>
            <Link
              to="/about"
              className="transition-colors hover:text-slate-900 dark:hover:text-slate-200"
            >
              关于
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
