# Typescript+React+Antd的通用后台管理系统

环境

* node: @16
* npm: @8

[Ant Design of React官网](https://ant-design.antgroup.com/components/overview-cn/)

## 1.创建项目

```text
npx create-react-app "你的项目的名称" --template typescript

```

参考package.json配置

```text
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.16.0",
  "redux": "^4.2.1",
  "react-redux": "^8.1.2",
```

## 2.样式初始化

`reset-css`比`Normalize.css`更直接，干净利落去除默认样式，更适合在企业里的场景。

```text
  npm i reset-css
```

在 `src/index.tsx`中引入reset-css

```js
  import React from 'react';
  import ReactDOM from 'react-dom/client';
  // 样式初始化一般放在组件的最前面
  import "reset-css"

  // UI框架的样式

  // 组件的样式
  import App from './App';


  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
```

## 3.scss的安装和使用

安装sass

```text
npm i node-sass sass-loader --save-dev
```

全局样式文件 `global.scss`

```scss
$bgColor: #eee;

body {
  background-color: $bgColor;
  user-select: none; // 禁用文字选中
}

img {
  // 禁止拖动图片
  -webkit-user-drag: none;
}
```

在 `index.tsx` 中引入全局样式

```text
import React from 'react';
import ReactDOM from 'react-dom/client';
// 样式初始化一般放在组件的最前面
import "reset-css"

// UI框架的样式

// 全局样式🔥
import "./assets/styles/global.scss"

// 组件的样式
import App from './App';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### 3.1scss文件的全局引入会影响其他组件

举例说明

`src/components/Comp1`

```js

import './comp1.scss' // 这种引入的方式属于全局引入，同类名组件的样式会受影响

const Comp1 = () => {
  return (
    <div className="box">
      <p>comp1的内容</p>
    </div>
  )
}

export default Comp1;

```

`src/components/Comp1`

```js

const Comp2 = () => {
  return (
    <div className="box">
      <p>comp2的内容</p>
    </div>
  )
}

export default Comp2;

```

在其他页面引入这两个组件，你会发现 虽然Comp2组件没有引入样式文件，但 `comp1.scss`样式同样在Comp2组件也生效了, 究其原因是
`import './comp1.scss'` 这种引入方式属于全局引入，同类名组件的样式会受影响。

### 3.2解决方案：scss的模块化管理样式

模块化声明文件 `src/index.d.ts`

```ts
declare module "*.jpg"
declare module "*.module.scss"

declare module'*.scss' {
  const content: {[key: string]: any}
  export = content
}
```

接着在 `tsconfig.json`引入该文件 (与include同级)

```json
{
  "compilerOptions": {
    ...
  },
  "files": [
    "./src/index.d.ts"
  ],
  "include": [
    "src"
  ]
}
```

模块化引入样式文件 `import styles from 'xxx.module.scss'`，以对象的方式使用

```text
// 模块化引入
import styles from './comp1.module.scss' 

const Comp1 = () => {
  return (
    <div className={styles.box}>
      <p>comp1的内容</p>
    </div>
  )
}

export default Comp1;

```

## 4.路径别名的配置

目前ts对@指向src目录的提示是不支持的，vite默认也是不支持的。
需要手动配置@符号的指向

[react如何设置文件路径别名](https://www.fengnayun.com/news/content/331378.html)

[解决 npm run eject 报错问题](https://blog.csdn.net/YanG_2859390447/article/details/120044977)

### 4.1配置路径别名的提示

虽然现在路径别名有了，但是在文件输入`@/`是没有提示路径的
需要我们在`tsconfig.json`中：添加两项配置

```text
"compilerOptions": {
  ...,
  "baseUrl": "./",
    "paths": {
      "@/*":[
        "src/*"
      ]
    }
}
```

配置好之后输入`@/`就有路径资源提示了

## 5.Antd Design

安装 [Antd Design](https://ant-design.antgroup.com/docs/react/introduce-cn)

```text
// 使用 npm 安装
npm install antd --save

// 使用 yarn 安装
yarn add antd
```

安装图标所需要的模块

```text
// 使用 npm 安装
npm install --save @ant-design/icons

// 使用 yarn 安装
yarn add @ant-design/icons
```

App组件中引入即可使用：

```tsx
import React from 'react';

// 引入UI组件
import { Button, Space } from 'antd';
// 引入组件图标
import { StepForwardOutlined } from '@ant-design/icons'

// 若没有样式生效，需要手动引入样式文件 (全部组件的样式都引入了)
// import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

const App: React.FC = () => (
  <Space wrap>
    <Button type="primary">Primary Button</Button>
    <StepForwardOutlined style={{fontSize: '40px', color: 'pink'}}/>
  </Space>
);

export default App;

```

### 5.1 配置Antd Design 样式自动按需引入

antd的4.x版本以上已经支持组件按需引入，我们只需要解决样式上的自动按需引入即可。
安装插件 `vite-plugin-style-import`

```text
npm install vite-plugin-style-import@1.4.1 -D
```

在vite.config.ts中进行配置：

```ts
import styleImport, {AntdResolve} from 'vite-plugin-style-import';

export default defineConfig {
  plugins: [
    react(),
    styleImport({
      resolves: [
        AntdResolve()
      ]
    })
  ],
  ...
}
```

接着去掉App.vue中的 `import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'`
这一行代码.

启动项目，发现报错，缺少less，进行安装 （Antd默认`xx.less`文件）

```text
npm i less@2.7.2 -D
```

[antd样式的按需引入](http://www.hzhcontrols.com/new-1352207.html)

## 6.React路由：第一种配置方案（旧项目中的写法）

### 6.1初步展示

模拟vue中的home和about两个组件

1.在 src下创建views文件夹

在该文件夹下创建 `Home.tsx` 和 `About.tsx`, 代码大致如下：

```ts
const Home = () => {
  return (
    <div>Home</div>
  )
}

export default Home;
```

2.配置对应关系（包含路由重定向）
在 src 下新建router文件夹，新建router/index.tsx

```tsx
import App from '../App'
import Home from '../views/Home'
import About from '../views/About'
// 路由重定向
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

```

3.替换顶级组件：在/src/index.tsx中把顶级组件App替换为这个路由对象

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// 引入路由🔥
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

```

4.在App.tsx中引入Outlet路由占位符

```tsx
import React from 'react'
// 路由占位符、路由跳转 🔥
import { Outlet, Link } from 'react-router-dom'

// 引入UI组件
import { Button } from 'antd'
// 引入组件图标
import { StepForwardOutlined } from '@ant-design/icons'

const App: React.FC = () => (
  <div>
    <div>
      <h1>App组件内容</h1>
      <div>
        <Button type="primary" size='small'>Primary Button</Button>
        <StepForwardOutlined style={{ fontSize: '20px', color: 'pink' }} />
      </div>

      <div>
        <Link to="/home">点击Home</Link>
        <Link to="/about">点击About</Link>
      </div>
    </div>

    {/* 占位符组件，类似于窗口，用来展示组件的，类似vue中的router-view */}
    <Outlet></Outlet>
  </div>
)

export default App

```

浏览器访问 `http://localhost:3000/home` 或者 `http://localhost:3000/about`, 即可看到相应页面的内容

## 7.React路由第二种方案（形如vue）

功能包括：路由懒加载、loading组件抽取

1.在`src/router/index.tsx`中，代码如下：

```tsx
import React, { lazy } from 'react'
// Navigate重定向组件
import { Navigate } from 'react-router-dom'

/**
 * @路由懒加载
 *  1.懒加载模式的组件的写法：外面需要套一层loading的提示加载组件
 *  2.抽离loading组件
 */
const Home = lazy(() => import('@/views/Home'))
const About = lazy(() => import('@/views/About'))

// loading组件
const withLoadingComponent = (comp: JSX.Element) => <React.Suspense fallback={<div>Loading...</div>}>{comp}</React.Suspense>

const routes = [
  {
    path: '/',
    element: <Navigate to="/home" />
  },
  {
    path: '/home',
    element: withLoadingComponent(<Home />)
  },
  {
    path: '/about',
    element: withLoadingComponent(<About />)
  }
]

export default routes

```

2.在入口文件`src/index.tsx`中，代码如下：

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
// 路由模式🔥
import { BrowserRouter } from 'react-router-dom'

// 引入App组件🔥
import App from './App'

// 样式初始化一般放在组件的最前面
import 'reset-css'

// UI框架的样式

// 全局样式
import '@/assets/styles/global.scss'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

```

3.在`src/App.tsx`中，代码如下：

```tsx
import React from 'react'
// 路由跳转、useRoutes钩子🔥
import { Link, useRoutes } from 'react-router-dom'

// 引入UI组件
import { Button } from 'antd'
// 引入组件图标
import { StepForwardOutlined } from '@ant-design/icons'

// 引入路由🔥
import router from './router'

const App: React.FC = () => {
  // ReactHooks 生成的路由对象🔥
  const outlet = useRoutes(router)

  return (
    <div>
      <div>
        <h1>App组件内容</h1>
        <div>
          <Button type="primary" size="small">
            Primary Button
          </Button>
          <StepForwardOutlined style={{ fontSize: '20px', color: 'pink' }} />
        </div>

        <div>
          <Link to="/home">点击Home</Link>
          <Link to="/about">点击About</Link>
        </div>
      </div>

      {/* 占位符组件，类似于窗口，用来展示组件的，类似vue中的router-view */}
      {outlet}
    </div>
  )
}

export default App

```
