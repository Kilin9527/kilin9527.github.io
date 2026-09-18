// Single source of truth for site-wide metadata.
// Edit these values first after cloning — nothing else hardcodes them.
export const site = {
  title: '开山怪博客',
  author: '开山怪',
  description: '记录学习笔记、工作经验。',
  url: 'https://kilin9527.github.io',
  github: 'https://github.com/kilin9527',
} as const

/** Formats an ISO `YYYY-MM-DD` frontmatter date for display. */
export function formatDate(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}
