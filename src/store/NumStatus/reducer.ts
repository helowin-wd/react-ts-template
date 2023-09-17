/**
 * @reducer 管理NumStatus数据
 */
import handleStatus from './index'

// 调用dispatch执行这里的代码
let reducer = (state = { ...handleStatus.state }, action: { type: string }) => {
  let newState = JSON.parse(JSON.stringify(state))

  /**
   * @优化思路
   *  1.switch的做法：每添加一个方法，都需要多写一个case
   *  2.switch的做法很像遍历，那我们就可以将case后面的值做成对象，actionNames
   */

  // switch (action.type) {
  //   case handleStatus.add1:
  //     handleStatus.actions[handleStatus.add1](newState, action)
  //     break;
  //   case handleStatus.add2:
  //     handleStatus.actions[handleStatus.add2](newState, action)
  //     break;

  //   default:
  //     break;
  // }

  /**
   * @switch优化 🚀🚀🚀
   * 
   * 优化的好处：每次写方法都不需要再手动添加case判断了😋
   */

  for (let key in handleStatus.actionNames) {
    if (action.type === handleStatus.actionNames[key]) {
      handleStatus.actions[handleStatus.actionNames[key]](newState, action)
      break;
    }
  }

  return newState
}

export default reducer;