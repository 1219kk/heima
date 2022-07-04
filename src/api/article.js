import request from '@/utils/request'

export const getArticle = (article_id) => {
  return request({
    url: `/articles/${article_id}`
  })
}
// 关注用户
export const addUser = (target) => {
  return request({
    method: 'POST',
    url: 'user/followings',
    data: {
      target
    }
  })
}
// 取消关注
export const delUser = (target) => {
  return request({
    method: 'DELETE',
    url: `user/followings/${target}`
  })
}
// 收藏文章
export const addCollect = (target) => {
  return request({
    method: 'POST',
    url: 'article/collections',
    data: {
      target
    }
  })
}
// 取消收藏  路径参数
export const delCollect = (target) => {
  return request({
    method: 'DELETE',
    url: `article/collections/${target}`
    // url: 'article/collections/:target'
  })
}
// 点赞
export const addLike = (target) => {
  return request({
    method: 'POST',
    url: 'article/likings',
    data: {
      target
    }
  })
}
// 取消点赞
export const delLike = (target) => {
  return request({
    method: 'DELETE',
    url: `article/likings/${target}`
  })
}
