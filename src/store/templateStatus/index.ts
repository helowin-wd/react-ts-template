const store = {
  // 数据
  state: {

  },
  // 同步方法
  actions: {

  },
  // 异步方法
  asyncActions: {

  },
  // 统一管理 type 状态
  actionNames: {}
}

let actionNames = {};
for (let key in store.actions) {
  actionNames[key] = key
}
store.actionNames = actionNames

export default store;