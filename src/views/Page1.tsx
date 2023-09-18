import { useSelector, useDispatch } from 'react-redux'
import numStatus from '@/store/NumStatus'

const Page1 = () => {
  const dispatch = useDispatch()

  //=> 对num的操作 🔥
  // 通过useSelector获取store仓库数据
  const { num, arr } = useSelector((state: RootState) => ({
    num: state.handleNumReducer.num,
    arr: state.handleArrReducer.arr
  }))
  // 通过useDispatch修改仓库数据
  const changeNum = () => {
    dispatch({
      type: 'add3',
      val: 100
    })
  }

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

  // 通过useDispatch修改仓库数据
  const changeArr = () => {
    dispatch({
      type: 'arrPush',
      val: 100
    })
  }

  return (
    <div className="home">
      <p>这是Page1页面内容</p>
      <p>{num}</p>
      <button onClick={changeNum}>同步按钮</button>
      <button onClick={changeNumASync}>异步按钮</button>
      <p>{arr}</p>
      <button onClick={changeArr}>按钮</button>
    </div>
  )
}

export default Page1
