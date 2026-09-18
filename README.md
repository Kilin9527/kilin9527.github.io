# 我的博客

用 React + Vite 构建、部署在 GitHub Pages 上的个人博客。

- **构建**：Vite 8（Rolldown + Oxc）
- **UI**：React 19 + TypeScript
- **路由**：React Router 8（HashRouter）
- **样式**：Tailwind CSS v4（CSS-first，无配置文件）
- **内容**：MDX，每篇文章就是一个 `.mdx` 文件
- **部署**：GitHub Actions → GitHub Pages

## 快速开始

```bash
npm install
npm run dev      # http://localhost:5173
```

其他命令：

```bash
npm run build      # 类型检查 + 生产构建，输出到 dist/
npm run preview    # 本地预览构建产物
npm run typecheck  # 只跑类型检查
npm run lint       # oxlint
```

## 写一篇新文章

在 `src/posts/` 下新建一个 `.mdx` 文件即可，**文件名就是 URL 里的 slug**。
不需要改任何配置，也不需要注册路由。

```mdx
---
title: 文章标题
date: 2026-09-15
summary: 一句话摘要，显示在列表和卡片上。
tags: [标签A, 标签B]
---

正文直接写 Markdown。

## 二级标题

- 列表、表格、代码块都支持
- 也可以直接写 React 组件（因为是 MDX）
```

`date` 用 `YYYY-MM-DD`，列表按日期倒序排列。字段都有兜底：缺 `title` 就用文件名，
缺 `tags` 就当没有标签。

## 部署到 GitHub Pages

### 第一次部署

1. 把代码推到仓库的 `main` 分支
2. 打开仓库 **Settings → Pages → Build and deployment → Source**，选 **GitHub Actions**

> ⚠️ **第 2 步是必须手动做的。** workflow 文件改不了这个设置。如果 Source 还停在
> "Deploy from a branch"，部署步骤会报 `Get Pages site failed`。这是「workflow 绿了
> 但网站没更新」的头号原因。

之后每次 push 到 `main`，`.github/workflows/deploy.yml` 会自动构建并发布。

### 需要确认的几件事

| 检查项 | 说明 |
| --- | --- |
| 默认分支 | workflow 里写的是 `main`，如果你的默认分支是 `master` 要改 |
| `package-lock.json` | 必须提交到仓库，`npm ci` 依赖它 |
| Node 版本 | workflow 固定 Node 22；Vite 8 需要 20.19+ / 22.12+ |

## 改成你自己的

1. **`src/lib/site.ts`** —— 站点标题、作者名、描述、GitHub 地址、站点 URL
2. **`public/favicon.svg`** —— 换成自己的图标
3. **`index.html`** —— `<title>` 和 `<meta name="description">`
4. **`src/posts/`** —— 删掉示例文章，换成自己的

## 关于 `base` 配置

`vite.config.ts` 里的 `base` 决定资源引用的路径，**配错就是白屏**：

| 仓库类型 | 访问地址 | `base` |
| --- | --- | --- |
| 用户主页 `<用户名>.github.io` | `https://<用户名>.github.io/` | `'/'` ← 当前 |
| 项目仓库 `blog` | `https://<用户名>.github.io/blog/` | `'/blog/'` |

斜杠两边都要有，大小写必须完全一致。

## 关于 HashRouter

`src/main.tsx` 用的是 `HashRouter` 而不是 `BrowserRouter`，原因是 **GitHub Pages
没有 SPA fallback**：用户直接访问或刷新 `/posts/foo` 时，服务器会去找这个文件，
找不到就返回真 404。

HashRouter 把路由放在 `#` 后面，服务器永远只看到 `/`，所以永远不会 404。代价是
URL 长这样：`https://<用户名>.github.io/#/posts/foo`，而且单篇文章的 SEO 基本没有。

如果你在意 SEO，正确做法是**预渲染**（构建时为每条路由产出真实 HTML），而不是
换回 `BrowserRouter` 再用 404.html 跳转 —— GitHub Pages 返回的仍然是 HTTP 404，
Google 从 2019 年起就不再跟随这种跳转了。

## 依赖说明

`package.json` 里有一条 `overrides`：

```json
"overrides": { "toml": "^5.0.0" }
```

`remark-mdx-frontmatter` 依赖 `toml@^3`，而 `toml <= 4.1.2` 有两个 high 级别的安全
公告，且 3.x 线上没有修复版本。我们只用 YAML frontmatter，这里强制升到已修复的
5.x。**升级 `remark-mdx-frontmatter` 后可以试着删掉这条 override**，然后跑
`npm audit` 和 `npm run build` 确认。

## 目录结构

```
src/
├── components/
│   ├── Layout.tsx        # 页头 / 页脚 / <Outlet>
│   ├── PostCard.tsx      # 列表里的文章卡片
│   └── ThemeToggle.tsx   # 明暗切换
├── lib/
│   ├── posts.ts          # 自动收集 src/posts/*.mdx 并解析 frontmatter
│   └── site.ts           # 站点元信息（改这里）
├── pages/
│   ├── Home.tsx          # 首页
│   ├── Posts.tsx         # 文章列表 + 标签筛选
│   ├── PostPage.tsx      # 文章详情
│   ├── About.tsx         # 关于
│   └── NotFound.tsx      # 404
├── posts/                # 文章（.mdx）
├── App.tsx               # 路由表
├── main.tsx              # 入口 + HashRouter
└── index.css             # Tailwind 入口 + 暗色变体
```
