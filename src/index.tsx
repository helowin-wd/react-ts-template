import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

// 引入路由
// import Router from './router';

import App from './App'

// 样式初始化一般放在组件的最前面
import 'reset-css'

// UI框架的样式

// 全局样式
import '@/assets/styles/global.scss'

// 状态管理
import { Provider } from 'react-redux'
import store from './store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
)
