import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router'
import App from './App.tsx'
import './index.css'

// HashRouter, not BrowserRouter.
//
// GitHub Pages is a plain static file server with no SPA fallback: a request
// for /posts/foo returns a real 404 on refresh. HashRouter keeps all routing
// after the `#`, so every deep link resolves to index.html and never 404s.
// Trade-off: URLs look like /#/posts/foo and per-post SEO is weak.
//
// If you later want clean URLs and real SEO, switch to prerendering each route
// to static HTML instead of swapping in BrowserRouter with the 404.html hack —
// GitHub Pages serves that hack as an HTTP 404, which Google stopped following.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
