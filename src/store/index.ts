import { legacy_createStore, combineReducers, compose, applyMiddleware } from 'redux';
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