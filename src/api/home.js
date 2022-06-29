import request from '@/utils/request'
// 获取所有频道列表
export const getMyChannels = () => {
  return request({
    url: 'user/channels'
  })
}
// 获取文章新闻推荐
// eslint-disable-next-line camelcase
export const getArticleList = ({ channel_id, timestamp }) => {
  return request({
    url: 'articles',
    params: { channel_id, timestamp }
  })
}
