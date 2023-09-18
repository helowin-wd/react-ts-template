import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input, Space, Button, message } from 'antd'
import styles from './login.module.scss'
import initLoginBg from './init'
import './login.less'

import { CaptchaAPI, LoginAPI } from '@/request/api'

const Login = () => {
  // 编程式导航
  const navigate = useNavigate()

  // 加载完这个组件之后执行: 背景初始化
  useEffect(() => {
    initLoginBg()
    window.onresize = function () {
      initLoginBg()
    }

    // 获取验证码图片
    getCaptchaImg()
  }, [])

  // 点击验证码的请求
  const getCaptchaImg = async () => {
    const res = await CaptchaAPI()
    if (res && res.code === 200) {
      console.log(res)
      // 1.图片地址
      setCaptchaImg('data:image/gif;base64,' + res.img)
      // 2.本地保存UUID
      localStorage.setItem('UUID', res.uuid)
    }
  }

  // 用户输入的信息
  const [usernameVal, setUsernameVal] = useState('') // 用户名
  const [passwordVal, setPasswordVal] = useState('') // 密码
  const [captchaVal, setCaptchaVal] = useState('') // 验证码
  // 验证码图片信息
  const [captchaImg, setCaptchaImg] = useState('')

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
  const toLogin = async () => {
    if (!usernameVal.trim() || !passwordVal.trim() || !captchaVal.trim()) {
      message.warning('请完整输入信息')
      return
    }

    const res = await LoginAPI({
      username: usernameVal,
      password: passwordVal,
      code: captchaVal,
      uuid: localStorage.getItem('UUID') as string
    })

    if(res && res.code ===200) {
      // 1.提示登录成功
      message.success("登录成功")
      // 2.保存token
      localStorage.setItem("REACT_TEMPLATE_TOKEN", res.token)
      // 3.跳转到/page1
      navigate("/page1")
      // 4.删除本地保存的UUID
      localStorage.removeItem("UUID")
    }
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
            <Input placeholder="qdtest1" onChange={usernameChange} />
            <Input.Password placeholder="123456" onChange={passwordChange} />
            <div className="captchaBox">
              <Input placeholder="验证码" onChange={captchaChange} />
              <div className="captchaImg" onClick={getCaptchaImg}>
                <img height="38" src={captchaImg} alt="" />
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
