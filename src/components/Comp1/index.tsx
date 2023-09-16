// 模块化引入
import styles from './comp1.module.scss' 

const Comp1 = () => {
  return (
    <div className={styles.box}>
      <p>comp1的内容</p>
    </div>
  )
}

export default Comp1;