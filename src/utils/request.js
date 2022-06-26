import axios from 'axios'
const instance = axios.create({
  baseURL: 'http://toutiao.itheima.net/v1_0',
  timeout: 5000
  // 五秒没访问到重新访问
})
export default instance
