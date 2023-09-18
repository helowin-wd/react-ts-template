import React, { useEffect } from 'react'
// 路由跳转
import { useRoutes, useLocation, useNavigate } from 'react-router-dom'
import {message} from 'antd'
// 引入路由
import router from './router/index2'

// 去往首页的组件
const ToPage1 = () => {
  const navigateTo = useNavigate()

  // 加载完这个组件之后实现跳转
  useEffect(() => {
    // 加载完组件之后执行这里的代码
    navigateTo('/page1')
    message.warning("您已经登录过了！")
  }, [navigateTo])
  return <div></div>
}

// 去往登录的组件
const ToLogin = () => {
  const navigateTo = useNavigate()

  // 加载完这个组件之后实现跳转
  useEffect(() => {
    // 加载完组件之后执行这里的代码
    navigateTo('/login')
    message.warning("您还没有登录，请登录后再访问！")
  }, [navigateTo])
  return <div></div>
}

// 自定义路由前置守卫
const BeforeRouterEnter = () => {
  // ReactHooks方式引入路由对象
  const outlet = useRoutes(router)

  /**
   * @后台管理系统两种经典跳转情况
   * 1.访问登录页面且token存在，跳转首页
   * 2.访问非登录页且无token，跳转登录页
   * 3.其余都可以正常放行
   */
  let token = localStorage.getItem('REACT_TEMPLATE_TOKEN')
  const location = useLocation()
  // 1.访问登录页面且token存在，跳转首页
  if (location.pathname === '/login' && token) {
    return <ToPage1 />
  }
  // 2.访问非登录页且无token，跳转登录页
  if (location.pathname !== '/login' && !token) {
    return <ToLogin />
  }

  return outlet
}

const App: React.FC = () => {
  return (
    <div>
      {/* 占位符组件，类似于窗口，用来展示组件的，类似vue中的router-view */}
      <BeforeRouterEnter />
    </div>
  )
}

export default App
