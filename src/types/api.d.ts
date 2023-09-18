// 这个文件专门定义：请求参数的类型、响应的类型


// 验证码的响应类型约束
interface CaptchaAPIRes {
  msg: string;
  img: string;
  code: number;
  captchaEnabled: boolean;
  uuid: string;
}

// 登录: 请求参数约束
interface LoginParams {
  username: string;
  password: string;
  code: string;
  uuid: string;
}
// 登录: 响应参数约束
interface LoginAPIRes {
  msg: string;
  code: number;
  token: string;
}