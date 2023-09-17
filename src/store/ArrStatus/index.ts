type N = {
  arr: number[]
}
interface T {
  type: string,
  val: number
}

const store = {
  state: {
    arr: [10, 20, 30]
  },
  actions: {
    arrPush(newState: N, action: T) {
      newState.arr.push(action.val)
    }
  },
  // 统一管理 type 状态
  actionNames: {}
}

/**
 * @这样做的好处
 *  1.actionNames中的type状态自动生成，形如：
 *    actionNames: { arrPush: "arrPush" }
 */
let actionNames = {};
for (let key in store.actions) {
  actionNames[key] = key
}
store.actionNames = actionNames

export default store;