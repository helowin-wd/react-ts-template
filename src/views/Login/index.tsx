import { ChangeEvent, useEffect, useState } from 'react'
import { Input, Space, Button } from 'antd'
import styles from './login.module.scss'
import initLoginBg from './init'
import './login.less'

const Login = () => {
  // 加载完这个组件之后执行: 背景初始化
  useEffect(() => {
    initLoginBg()
    window.onresize = function () {
      initLoginBg()
    }
  }, [])

  // 用户输入的信息
  const [usernameVal, setUsernameVal] = useState('') // 用户名
  const [passwordVal, setPasswordVal] = useState('') // 密码
  const [captchaVal, setCaptchaVal] = useState('') // 验证码

  const usernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsernameVal(e.target.value)
  }

  const passwordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordVal(e.target.value)
  }

  const captchaChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCaptchaVal(e.target.value)
  }

  // 点击登录
  const toLogin = () => {
    console.log('用户输入的信息', {
      usernameVal,
      passwordVal,
      captchaVal
    })
  }

  return (
    <div className={styles.loginPage}>
      {/* 存放背景 */}
      <canvas id="canvas" style={{ display: 'block' }}></canvas>

      <div className={styles.loginBox + ' login-wrapper'}>
        <div className={styles.title}>
          <h1>React+TypeScript+Redux通用后台管理系统</h1>
          <p>Strive Everyday</p>
        </div>
        <div className={styles.formContent}>
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Input placeholder="用户名" onChange={usernameChange} />
            <Input.Password placeholder="密码" onChange={passwordChange} />
            <div className="captchaBox">
              <Input placeholder="验证码" onChange={captchaChange} />
              <div className="captchaImg">
                <img height="38" src="" alt="" />
              </div>
            </div>
            <Button className="loginBtn" type="primary" block onClick={toLogin}>
              登录
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default Login
