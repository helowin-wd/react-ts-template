import { legacy_createStore, combineReducers } from 'redux';
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
const store = legacy_createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store;