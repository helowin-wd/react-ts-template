import React from 'react';
import ReactDOM from 'react-dom/client';

// 引入路由
import Router from './router';

// 样式初始化一般放在组件的最前面
import "reset-css"

// UI框架的样式

// 全局样式
import "@/assets/styles/global.scss"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);