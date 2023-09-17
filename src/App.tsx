import React from 'react'
// 路由跳转
import { Link, useRoutes } from 'react-router-dom'

// 引入UI组件
// import { Button } from 'antd'
// 引入组件图标
// import { StepForwardOutlined } from '@ant-design/icons'

// 引入路由
import router from './router/index2'

const App: React.FC = () => {
  // ReactHooks方式引入路由对象
  const outlet = useRoutes(router)

  return (
    <div>
      {/* 占位符组件，类似于窗口，用来展示组件的，类似vue中的router-view */}
      {outlet}
    </div>
  )
}

export default App
