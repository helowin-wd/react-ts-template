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

## 8.侧边栏配置

功能点如下

* 嵌套路由
* 菜单组件抽取 `MainMenu`
  * 设置菜单手风琴效果：只能有一个展开项
  * 编程式导航 useNavigate
  * 点击侧边栏获取路径
  * 刷新页面：当前项选中并且展开
    * 样式处理
    * 配置初始展开项
    * 类型约束处理：[ts如何书写obj['key']不报错的解决方法🔥](https://blog.csdn.net/weixin_44666644/article/details/132942137?csdn_share_tail=%7B%22type%22%3A%22blog%22%2C%22rType%22%3A%22article%22%2C%22rId%22%3A%22132942137%22%2C%22source%22%3A%22weixin_44666644%22%7D)

1.在`src/components/MainMenu/index.tsx`中，抽取菜单组件

```tsx
import React, { useState } from 'react'
import { DesktopOutlined, PieChartOutlined, UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number]

// 登录请求到数据之后，就可以跟items这个数组进行匹配
const items: MenuItem[] = [
  {
    label: 'Page1',
    key: '/page1',
    icon: <PieChartOutlined />
  },
  {
    label: 'Page2',
    key: '/page2',
    icon: <DesktopOutlined />
  },
  {
    label: 'Page3',
    key: 'page3',
    icon: <UserOutlined />,
    children: [
      {
        label: 'Page3-1',
        key: '/page3/page3-1'
      },
      {
        label: 'Page3-2',
        key: '/page3/page3-2'
      }
    ]
  },
  {
    label: 'Page4',
    key: 'page4',
    icon: <UserOutlined />,
    children: [
      {
        label: 'Page4-1',
        key: '/page4/page4-1'
      },
      {
        label: 'Page4-2',
        key: '/page4/page4-2'
      }
    ]
  }
]

const Comp: React.FC = () => {
  // 获取当前路由路径
  const currentRoute = useLocation()

  /**
   * @刷新页面，激活菜单栏所在的上级菜单展开
   */
  let firstOpenKey: string = "";
  function findKey(obj: {key: string}) {
    return obj.key === currentRoute.pathname
  }

  for(let i = 0; i < items.length; i++) {
    if(items[i]!['children'] && items[i]!['children'].length > 0 && items[i]!['children'].find(findKey)) {
      firstOpenKey = items[i]!.key as string;
      break;
    }
  }

  // 设置展开项的初始值
  const [openKeys, setOpenKeys] = useState([firstOpenKey])

  const navigateTo = useNavigate()

  /**
   * 如果发现加载两次打印，开发环境才会出现，生产环境不会出现。原因如下：
   * 在入口文件 index.tsx 把严格模式去掉，就不会出现了。至于为什么react要它加载两次
   * 详情见：https://blog.csdn.net/HYHhmbb/article/details/125973790
   */
  console.log(currentRoute.pathname)

  // 左侧菜单栏-点击跳转对应路由
  const menuClick = (e: { key: string }) => {
    // 编程式导航
    navigateTo(e.key)
  }

  /**
   * 菜单栏展开/收缩
   * @param keys 是一个数组，记录了当前哪一项是展开的
   */
  const handleOpenChange = (keys: string[]) => {
    // 设置只能有一个展开项
    setOpenKeys([keys[keys.length - 1]])
  }

  return (
    <Menu theme="dark" defaultSelectedKeys={[currentRoute.pathname]} mode="inline" items={items} onClick={menuClick} onOpenChange={handleOpenChange} openKeys={openKeys} />
  )
}

export default Comp

```

2.在首页`Home.tsx`中

```tsx
import React, { useState } from 'react'
import { Breadcrumb, Layout, theme } from 'antd'
import { Outlet } from 'react-router-dom'
import MainMenu from '@/components/MainMenu'

const { Header, Content, Footer, Sider } = Layout

const Home: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  const BreadItems = [
    {
      title: 'User'
    },
    {
      title: 'Bill'
    }
  ]

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <MainMenu />
      </Sider>
      <Layout>
        <Header style={{ paddingLeft: '16px', background: colorBgContainer }}>
          <Breadcrumb style={{ lineHeight: '64px' }} separator="/" items={BreadItems} />
        </Header>
        <Content style={{ margin: '16px 16px 0' }}>
          <div style={{ height: '100%', padding: 24, minHeight: 360, background: colorBgContainer }}>
            {/* 窗口部分 */}
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center', padding: 0, lineHeight: '48px' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  )
}

export default Home

```

3.在`router/index.tsx`中

功能点：嵌套路由

```tsx
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

```

## 9.登录页面

功能点

* canvas绘制星空背景
* placeholder 字体颜色控制
* [react如何正确引入less](https://wudong.blog.csdn.net/article/details/132949029)，覆盖UI组件默认样式
  
* 创建登录组件
* ts如何处理事件对象e
* [ts踩坑记录：其目标缺少构造签名的 “new“ 表达式隐式具有 “any“ 类型](https://wudong.blog.csdn.net/article/details/132948151)

1.在 `login/init.ts` 中

canvas绘制星空背景 🔥

```ts
// 链接：https://juejin.cn/post/7250658226412060731

export default function initLoginBg() {
  var windowWidth = document.documentElement.clientWidth || document.body.clientWidth;
  var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
  var canvas = document.getElementById('canvas') as HTMLCanvasElement,
    ctx = canvas.getContext('2d') as CanvasRenderingContext2D,
    w = canvas.width = windowWidth,
    h = canvas.height = windowHeight,

    hue = 217,
    stars: IntStart[] = [],
    count = 0,
    maxStarts = 500; // 星星数量

  var canvas2 = document.createElement('canvas'),
    ctx2 = canvas2.getContext('2d') as CanvasRenderingContext2D;
  canvas2.width = 100;
  canvas2.height = 100;
  var half = canvas2.width / 2,
    gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
  gradient2.addColorStop(0.025, '#ccc');
  gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
  gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
  gradient2.addColorStop(1, 'transparent');

  ctx2.fillStyle = gradient2;
  ctx2.beginPath();
  ctx2.arc(half, half, half, 0, Math.PI * 2);
  ctx2.fill();

  // End cache

  function random(min: number, max = 0) {
    if (arguments.length < 2) {
      max = min;
      min = 0;
    }

    if (min > max) {
      var hold = max;
      max = min;
      min = hold;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function maxOrbit(x: number, y: number) {
    var max = Math.max(x, y),
      diameter = Math.round(Math.sqrt(max * max + max * max));
    return diameter / 2; // 星星移动范围，值越大范围越小
  }

  interface IntStart {
    orbitRadius: number;
    radius: number;
    orbitX: number;
    orbitY: number;
    timePassed: number;
    speed: number;
    alpha: number;
    draw: () => void;
  }
  var Star = function (this: IntStart) {
    this.orbitRadius = random(maxOrbit(w, h));
    this.radius = random(60, this.orbitRadius) / 18;
    // 星星大小
    this.orbitX = w / 2;
    this.orbitY = h / 2;
    this.timePassed = random(0, maxStarts);
    this.speed = random(this.orbitRadius) / 500000;
    // 星星移动速度
    this.alpha = random(2, 10) / 10;
    count++;
    stars[count] = this;
  }

  Star.prototype.draw = function () {
    var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
      y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
      twinkle = random(10);

    if (twinkle === 1 && this.alpha > 0) {
      this.alpha -= 0.05;
    } else if (twinkle === 2 && this.alpha < 1) {
      this.alpha += 0.05
    }

    ctx.globalAlpha = this.alpha;
    ctx.drawImage(
      canvas2,
      x - this.radius / 2,
      y - this.radius / 2,
      this.radius,
      this.radius
    );
    this.timePassed += this.speed;
  }

  for (let i = 0; i < maxStarts; i++) {
    new (Star as any)(); // 🔥
  }

  function animation() {
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 0.8; // 尾巴
    ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 1)';
    ctx.fillRect(0, 0, w, h);

    // ctx.drawImage(img, 0, 0);
    ctx.globalCompositeOperation = 'lighter';
    for (let i = 1, l = stars.length; i < l; i++) {
      stars[i].draw();
    }

    window.requestAnimationFrame(animation);
  }

  animation();
}

```

2.在 `login/login.less` 中

```less
// 覆盖组件的默认样式 🔥
.login-wrapper {
  .ant-input, .ant-input-password {
    background-color: rgba(255, 255, 255, 0);
    border-color: #1890ff;
    color: #fff;
    height: 38px;
  }

  // placeholder字体颜色控制 🔥
  .ant-input::-webkit-input-placeholder {
    color: rgba(24, 144, 255, .5);
  }

  // 输入密码对齐显示
  .ant-input-password .ant-input {
    height: 28px;
  }

  // 眼睛图标
  .ant-input-password-icon.anticon, 
  .ant-input-password-icon.anticon:hover {
    color: #1890ff;
  }
  .captchaBox {
    display: flex;
    .captchaImg {
      width: 38px;
      margin-left: 20px;
      cursor: pointer;
      background: blue;
    }
  }
  .loginBtn {
    height: 38px;
  }
}
```

3.在 `login/login.module.scss` 中

```scss
.loginPage {
  position: relative;
  .loginBox {
    width: 450px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #fff;

    h1 {
      font-weight: bold;
      font-size: 22px;
      text-align: center;
      color: #fff;
    }
    p {
      text-align: center;
      margin: 20px 0;
    }
    .title {
      margin-bottom: 40px;
      position: relative;
      &::before,
      &::after {
        content: '';
        width: 100px;
        height: 2px;
        position: absolute;
        background: linear-gradient(to right, rgba(255, 255, 255, 0), #1976D2);
        left: -110px;
        top: 12px;
      }
      &::after {
        left: auto;
        background: linear-gradient(to left, rgba(255, 255, 255, 0), #1976D2);
        right: -110px;
      }
    }
  }
}

```

4.在登录页面`login/index.tsx`中

```tsx
import { ChangeEvent, useEffect, useState } from 'react'
import { Input, Space, Button } from 'antd'
import styles from './login.module.scss'
import initLoginBg from './init'
import './login.less'

const Login = () => {
  // 加载完这个组件之后执行: 背景初始化
  useEffect(() => {
    initLoginBg()
    window.onresize = function () {
      initLoginBg()
    }
  }, [])

  // 用户输入的信息
  const [usernameVal, setUsernameVal] = useState('') // 用户名
  const [passwordVal, setPasswordVal] = useState('') // 密码
  const [captchaVal, setCaptchaVal] = useState('') // 验证码

  // ts如何对事件对象e 定义类型 🔥
  const usernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsernameVal(e.target.value)
  }

  const passwordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordVal(e.target.value)
  }

  const captchaChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCaptchaVal(e.target.value)
  }

  // 点击登录
  const toLogin = () => {
    console.log('用户输入的信息', {
      usernameVal,
      passwordVal,
      captchaVal
    })
  }

  return (
    <div className={styles.loginPage}>
      {/* 存放背景 */}
      <canvas id="canvas" style={{ display: 'block' }}></canvas>

      <div className={styles.loginBox + ' login-wrapper'}>
        <div className={styles.title}>
          <h1>React+TypeScript+Redux通用后台管理系统</h1>
          <p>Strive Everyday</p>
        </div>
        <div className={styles.formContent}>
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Input placeholder="用户名" onChange={usernameChange} />
            <Input.Password placeholder="密码" onChange={passwordChange} />
            <div className="captchaBox">
              <Input placeholder="验证码" onChange={captchaChange} />
              <div className="captchaImg">
                <img height="38" src="" alt="" />
              </div>
            </div>
            <Button className="loginBtn" type="primary" block onClick={toLogin}>
              登录
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default Login

```

## 10.react-redux 🚀🚀🚀

功能点

* 获取/修改store仓库数据
* 两个TS警告解决方案 🔥
* 数据和方法从reducer中进行抽离
* 模块化reducer
  * 模块化reducer并组合起来
  * 【亮点🌟】优化switch...case语句，采用for循环♻️
  * 【亮点🌟】方法名对象actionNames的自动生成
  * 【亮点🌟】完善各个模块reducer

优化封装的成果：后续新增数据模块，仅需复制 `store/templateStatus` 中的代码，然后在 `store/index.ts`引入，如

```ts
// 需要新增数据模块，复制模版代码引入即可 🔥
import handleTemplateReducer from './templateStatus/reducer'

// 组合各个模块的reducer
const reducers = combineReducers({
  ...,
  handleTemplateReducer
})
```

详情见: 代码提交记录📝

## 11.react-redux的异步解决方案redux-thunk

功能点

* 手动封装redux-thunk的异步函数
* 解决问题: [参数不能赋给类型“AnyAction”的参数](https://blog.csdn.net/YAYTXT/article/details/128090982)

在`store/NumStatus/index.ts`中做异步操作：

```ts
add1(newState: {num: number}, action: {type: string}) {
  // 会有bug 没有办法达到延迟和修改的效果
  setTimeout(() => {
    newState.num++
  }, 1000)
}
```

会发现这种写法其实达不到想要的异步效果，需要通过redux相关的异步解决方案来解决（市面上有`redux-saga`,`redux-thunk`）, 我们使用`redux-thunk`
`redux-thunk`相比于`redux-saga`，体积小，灵活，但需要自己手动抽取和封装。但学习成本低。

项目目录下安装`redux-thunk`

```text
npm i redux-thunk
```

1.在`store/index.ts`中

```ts
import { legacy_createStore, combineReducers, compose, applyMiddleware } from 'redux';
// 引入redux-thunk 🔥
import reduxThunk from 'redux-thunk'

import handleNumReducer from './NumStatus/reducer'
import handleArrReducer from './ArrStatus/reducer'

// 需要新增数据模块，复制模版代码引入即可 🔥
import handleTemplateReducer from './templateStatus/reducer'

// 组合各个模块的reducer
const reducers = combineReducers({
  handleNumReducer,
  handleArrReducer,
  handleTemplateReducer
})

/**
 * @创建数据仓库
 * 
 * window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 为了让浏览器正常使用插件：redux-dev-tools
 */
// const store = legacy_createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


/**
 * @redux-thunk 处理异步
 */
// 判断有没有 __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 这个模块
let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}):compose

// 把仓库数据，浏览器redux-dev-tools, 还有reduxThunk插件关联在store中
const store = legacy_createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)));

export default store;
```

2.在 `store/NumStatus/index.ts` 中定义异步方法

```ts
const store = {
  ...,
  // 异步方法：优化redux-thunk的异步写法（模仿vuex的写法）
  asyncActions: {
    asyncAdd1(dispatch: Function){
      setTimeout(() => {
        dispatch({ type: "add1" })
      }, 1000)
    }
  }
}
```

3.在页面中调用异步方法

```tsx
import numStatus from '@/store/NumStatus'

// 异步 redux-thunk 的用法
const changeNumASync = () => {
  // 优化redux-thunk的异步写法
  // dispatch(调用状态管理中的asyncAdd1)
  /**
   * @ts问题记录
   * dispatch(numStatus.asyncActions.asyncAdd1)
   * 上述写法报错：类型“(dispatch: Function) => void”的参数不能赋给类型“AnyAction”的参数
   * 
   * 解决方案：https://blog.csdn.net/YAYTXT/article/details/128090982
   */
  dispatch(numStatus.asyncActions.asyncAdd1 as any)
}
```

## 12.数据交互的解决方案

功能点

* axios封装和apis的抽取 🔥
* 数据交互请求
  * 获取验证码
  * 规范化请求中的TypeScript的书写 🔥
  * 请求参数和返回参数类型约束 🔥 
  * 登录的业务逻辑处理
* 手写封装前置路由守卫 🔥
  * 思路分析和业务实现

安装axios

```text
npm i axios
```

### axios封装和apis的抽取 🔥

/src下新建request文件夹，并新建index.ts

```ts
import axios from "axios";

// 创建axios实例
const instance = axios.create({
  baseURL: "http://xue.cnkdl.cn:23683",
  timeout: 3000
})

// 请求拦截器
instance.interceptors.request.use(config => {
  return config
}, err => {
  return Promise.reject(err)
});

// 响应拦截器
instance.interceptors.response.use(res => {
  return res.data
}, err => {
  return Promise.reject(err)
});

export default instance;
```

在 /src/request 下新建api.ts

```ts
import request from './index';

export const captchaAPI = () => request.get("/prod-api/captchaImage");
```

### 登录的业务逻辑处理

在`Login.tsx`中

```tsx
import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input, Space, Button, message } from 'antd'
import styles from './login.module.scss'
import initLoginBg from './init'
import './login.less'

import { CaptchaAPI, LoginAPI } from '@/request/api'

const Login = () => {
  // 编程式导航
  const navigate = useNavigate()

  // 加载完这个组件之后执行: 背景初始化
  useEffect(() => {
    initLoginBg()
    window.onresize = function () {
      initLoginBg()
    }

    // 获取验证码图片
    getCaptchaImg()
  }, [])

  // 点击验证码的请求
  const getCaptchaImg = async () => {
    const res = await CaptchaAPI()
    if (res && res.code === 200) {
      console.log(res)
      // 1.图片地址
      setCaptchaImg('data:image/gif;base64,' + res.img)
      // 2.本地保存UUID
      localStorage.setItem('UUID', res.uuid)
    }
  }

  // 用户输入的信息
  const [usernameVal, setUsernameVal] = useState('') // 用户名
  const [passwordVal, setPasswordVal] = useState('') // 密码
  const [captchaVal, setCaptchaVal] = useState('') // 验证码
  // 验证码图片信息
  const [captchaImg, setCaptchaImg] = useState('')

  const usernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsernameVal(e.target.value)
  }

  const passwordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordVal(e.target.value)
  }

  const captchaChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCaptchaVal(e.target.value)
  }

  // 点击登录
  const toLogin = async () => {
    if (!usernameVal.trim() || !passwordVal.trim() || !captchaVal.trim()) {
      message.warning('请完整输入信息')
      return
    }

    const res = await LoginAPI({
      username: usernameVal,
      password: passwordVal,
      code: captchaVal,
      uuid: localStorage.getItem('UUID') as string
    })

    if(res && res.code ===200) {
      // 1.提示登录成功
      message.success("登录成功")
      // 2.保存token
      localStorage.setItem("REACT_TEMPLATE_TOKEN", res.token)
      // 3.跳转到/page1
      navigate("/page1")
      // 4.删除本地保存的UUID
      localStorage.removeItem("UUID")
    }
  }

  return (
    <div className={styles.loginPage}>
      {/* 存放背景 */}
      <canvas id="canvas" style={{ display: 'block' }}></canvas>

      <div className={styles.loginBox + ' login-wrapper'}>
        <div className={styles.title}>
          <h1>React+TypeScript+Redux通用后台管理系统</h1>
          <p>Strive Everyday</p>
        </div>
        <div className={styles.formContent}>
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Input placeholder="qdtest1" onChange={usernameChange} />
            <Input.Password placeholder="123456" onChange={passwordChange} />
            <div className="captchaBox">
              <Input placeholder="验证码" onChange={captchaChange} />
              <div className="captchaImg" onClick={getCaptchaImg}>
                <img height="38" src={captchaImg} alt="" />
              </div>
            </div>
            <Button className="loginBtn" type="primary" block onClick={toLogin}>
              登录
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default Login

```

### 规范化请求中的TypeScript的书写 🔥

在 `src/types/api.d.ts`

```ts
// 这个文件专门定义：请求参数的类型、响应的类型


// 验证码的响应类型约束
interface CaptchaAPIRes {
  msg: string;
  img: string;
  code: number;
  captchaEnabled: boolean;
  uuid: string;
}

// 登录: 请求参数约束
interface LoginParams {
  username: string;
  password: string;
  code: string;
  uuid: string;
}
// 登录: 响应参数约束
interface LoginAPIRes {
  msg: string;
  code: number;
  token: string;
}
```

### 请求参数和返回参数类型约束 🔥

在 `src/request/api.ts`

```ts
import request from './index';

// 请求中：请求参数和返回值的类型都需要进行约束

// 验证码请求
export const CaptchaAPI = ():Promise<CaptchaAPIRes> => request.get("/prod-api/captchaImage");

// 登录请求
export const LoginAPI = (params: LoginParams):Promise<LoginAPIRes> => request.post("/prod-api/login", params);
```

### 手写封装前置路由守卫 🔥

在 `src/App.tsx` 中

```tsx
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
```
