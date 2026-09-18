import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

// The inline script in index.html already applied the class before first paint,
// so read it back rather than recomputing — that keeps the button in sync with
// what the user actually sees and avoids a second, contradictory decision.
function readTheme(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(readTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // Private browsing can reject writes; the toggle still works for this page.
    }
  }, [theme])

  const next = theme === 'dark' ? '浅色' : '深色'

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label={`切换到${next}模式`}
      title={`切换到${next}模式`}
      className="ml-1 rounded-md px-2 py-1.5 text-sm text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
    >
      {theme === 'dark' ? '☀' : '☾'}
    </button>
  )
}
