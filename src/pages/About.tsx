import { site } from '../lib/site'

export default function About() {
  return (
    <div className="prose prose-slate max-w-none dark:prose-invert">
      <h1>关于</h1>
      <p>
        你好，我是 {site.author}。这里是我的个人博客，用来记录学习和做东西的过程。
      </p>

      <h2>联系我</h2>
      <ul>
        <li>
          GitHub：
          <a href={site.github} target="_blank" rel="noreferrer">
            {site.github.replace('https://', '')}
          </a>
        </li>
        <li>
          站点地址：
          <a href={site.url} target="_blank" rel="noreferrer">
            {site.url.replace('https://', '')}
          </a>
        </li>
      </ul>
    </div>
  )
}
