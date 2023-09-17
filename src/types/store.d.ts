/**
 * @该文件属于全局类型声明文件，不需要在其他地方引入该文件
 * 
 * 【重点】类型声明里面不要直接使用引入，如：import ... from '...'
 *  而是使用 import("@/store") 这种语法，这样其他组件可以直接使用该类型声明
 *  不需要手动引入
 * 
 *  而 import ... from '...' 这种语法需要导出，需要的地方导入
 */
// import store from "@/store";

// TS提供了ReturnType, 用了获取函数类型的返回值
type RootState = ReturnType<typeof import("@/store").getState>

interface Window {
  __REDUX_DEVTOOLS_EXTENSION__: function
}