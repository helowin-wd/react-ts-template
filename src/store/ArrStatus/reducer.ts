/**
 * @reducer 管理ArrStatus数据
 */
import handleStatus from './index'

// 调用dispatch执行这里的代码
let reducer = (state = { ...handleStatus.state }, action: { type: string }) => {
  let newState = JSON.parse(JSON.stringify(state))

  for (let key in handleStatus.actionNames) {
    if (action.type === handleStatus.actionNames[key]) {
      handleStatus.actions[handleStatus.actionNames[key]](newState, action)
      break;
    }
  }

  return newState
}

export default reducer;