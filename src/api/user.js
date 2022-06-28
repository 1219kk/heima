import request from '@/utils/request'
// 再有在vue组件文件中才可以用this.$store 在js中没有这个this
// 所有只能先引入
import store from '@/store'
/**
 *登录界面发送短信验证码
 * @param {number} mobile
 * @returns promise
 */
export const getSmsCode = (mobile) => {
  return request({
    url: `/sms/codes/${mobile}`
  })
}

/**
 *用户认证（登录注册）
 * @param {mobile code} param0
 * @return promise
 */
export const login = ({ mobile, code }) => {
  return request({
    method: 'POST',
    url: '/authorizations',
    data: {
      mobile,
      code
    }
  })
}
/**
 *获取用户个人资料
 获取用户自己信息
 * @returns
 */
export const getUserInfo = () => {
  return request({
    url: 'user',
    headers: {
      Authorization: 'Bearer ' + store.state.user.token
    }
  })
}
