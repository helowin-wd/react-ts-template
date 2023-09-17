type N = {
  num: number
}
interface T {
  type: string,
  val: number
}

const store = {
  state: {
    num: 20
  },
  actions: {
    add1(newState: N, action: T) {
      newState.num++
    },
    add2(newState: N, action: T) {
      newState.num += action.val
    },
    add3(newState: N, action: T) {
      newState.num += action.val
    }
  },
  // 统一管理 type 状态
  actionNames: {}
}

/**
 * @这样做的好处
 *  1.actionNames中的type状态自动生成，形如：
 *    actionNames: { add1: "add1" }
 */
let actionNames = {};
for (let key in store.actions) {
  actionNames[key] = key
}
store.actionNames = actionNames

export default store;