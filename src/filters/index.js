import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

export const dateformat = (time) => {
  return dayjs(time).fromNow()
}
// 批量创建过滤器 好处:创建新的过滤器代码会简单 写一个普通的函数并且按需导出就行
