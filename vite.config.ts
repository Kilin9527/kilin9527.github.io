import mdx from '@mdx-js/rollup'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkGfm from 'remark-gfm'
import { defineConfig, type Plugin } from 'vite'
import { site } from './src/lib/site.ts'

// Injects the site title / description from src/lib/site.ts into index.html so
// that file stays the single source of truth, instead of drifting out of sync
// with the static <title> there. `order: 'pre'` runs it before Vite's own %VAR%
// env substitution.
function htmlSiteMeta(): Plugin {
  return {
    name: 'html-site-meta',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return html
          .replaceAll('%SITE_TITLE%', site.title)
          .replaceAll('%SITE_DESCRIPTION%', site.description)
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  // This repo is the *user site* (<username>.github.io), so it is served from
  // the domain root and `base` stays '/'.
  //
  // If you ever move this blog into a normal project repo (e.g. `blog`, served
  // from https://<username>.github.io/blog/), change this to '/blog/' and keep
  // the trailing slash. A wrong `base` produces a blank page with 404s on /assets/*.
  base: '/',

  plugins: [
    htmlSiteMeta(),
    // MDX must run *before* the React plugin transforms the file, and the React
    // plugin's `include` must cover .mdx or JSX inside posts is left untransformed.
    {
      enforce: 'pre',
      ...mdx({
        providerImportSource: '@mdx-js/react',
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm],
      }),
    },
    react({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
    tailwindcss(),
  ],
})
