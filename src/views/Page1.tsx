import { useSelector, useDispatch } from 'react-redux'

const Page1 = () => {
  const dispatch = useDispatch()

  //=> 对num的操作 🔥
  // 通过useSelector获取store仓库数据
  const { num } = useSelector((state: RootState) => ({
    num: state.handleNumReducer.num
  }))
  // 通过useDispatch修改仓库数据
  const changeNum = () => {
    dispatch({
      type: 'add3',
      val: 100
    })
  }

  //=> 对数组的操作
  const { arr } = useSelector((state: RootState) => ({
    arr: state.handleArrReducer.arr
  }))
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
      <button onClick={changeNum}>按钮</button>
      <p>{arr}</p>
      <button onClick={changeArr}>按钮</button>
    </div>
  )
}

export default Page1
