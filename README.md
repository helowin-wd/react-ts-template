# Typescript+React+Antd的通用后台管理系统

环境

* node: @16
* npm: @8

[Ant Design of React官网](https://ant-design.antgroup.com/components/overview-cn/)

## 一、创建项目

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

## 二、样式初始化

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

## 四、scss的安装和使用

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

### scss文件的全局引入会影响其他组件

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

### 解决方案：scss的模块化管理样式

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

















## 五、路径别名的配置

目前ts对@指向src目录的提示是不支持的，vite默认也是不支持的。
需要手动配置@符号的指向

[react如何设置文件路径别名](https://www.fengnayun.com/news/content/331378.html)

[解决 npm run eject 报错问题](https://blog.csdn.net/YanG_2859390447/article/details/120044977)

### 配置路径别名的提示

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
