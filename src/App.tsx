import { Route, Routes } from 'react-router'
import Layout from './components/Layout'
import About from './pages/About'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import PostPage from './pages/PostPage'
import Posts from './pages/Posts'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="posts" element={<Posts />} />
        <Route path="posts/:slug" element={<PostPage />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
