// 组件形式的写法【旧项目的写法】

import App from '../App'
import Home from '../views/Home'
import About from '../views/About'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
// 两种路由模式的组件：BrowserRouter（History模式）HashRouter（Hash模式）

// 是否需要写return 取决于内容是否有逻辑，没有逻辑不需要return

// const baseRouter = () => {
//   return ()
// }

// 以上写法可以简写为：
const baseRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        {/* 路由重定向: 用户访问/的时候，重定向到/home路径 */}
        <Route path='/' element={<Navigate to="/home"/>}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
)

export default baseRouter
