// React路由写法2 【推荐】

import React, { lazy } from 'react'
// Navigate重定向组件
import { Navigate } from 'react-router-dom'

/**
 * @路由懒加载
 *  1.懒加载模式的组件的写法：外面需要套一层loading的提示加载组件
 *  2.抽离loading组件
 */
const Home = lazy(() => import('@/views/Home'))
const Page1 = lazy(() => import('@/views/Page1'))
const Page2 = lazy(() => import('@/views/Page2'))
const Page3One = lazy(() => import('@/views/Page3/Page3-1'))
const Page3Two = lazy(() => import('@/views/Page3/Page3-2'))
const Page4One = lazy(() => import('@/views/Page4/Page4-1'))
const Page4Two = lazy(() => import('@/views/Page4/Page4-2'))

// loading组件
const withLoadingComponent = (comp: JSX.Element) => <React.Suspense fallback={<div>Loading...</div>}>{comp}</React.Suspense>

const routes = [
  {
    path: '/',
    element: <Navigate to="/page1" />
  },
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/page1',
        element: withLoadingComponent(<Page1 />)
      },
      {
        path: '/page2',
        element: withLoadingComponent(<Page2 />)
      },
      {
        path: '/page3/page3-1',
        element: withLoadingComponent(<Page3One />)
      },
      {
        path: '/page3/page3-2',
        element: withLoadingComponent(<Page3Two />)
      },
      {
        path: '/page4/page4-1',
        element: withLoadingComponent(<Page4One />)
      },
      {
        path: '/page4/page4-2',
        element: withLoadingComponent(<Page4Two />)
      }
    ]
  },
  // 访问其他路径，重定向首页
  {
    path: '*',
    element: <Navigate to="/page1" />
  }
]

export default routes
