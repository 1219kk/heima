import request from '@/utils/request'

// 获取评论或评论回复
/**
 * source  源id，文章id或评论id
 * offset 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
 * limit 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
 */
export const getCommentList = ({ type, source, offset, limit }) => {
  return request({
    url: 'comments',
    params: {
      type,
      source,
      offset,
      limit
    }
  })
}
// 对评论或评论回复点赞
export const addLike = (target) => {
  return request({
    method: 'POST',
    url: 'comment/likings',
    data: {
      target
    }
  })
}

// 取消对评论或评论回复点赞
export const delLike = (target) => {
  return request({
    method: 'DELETE',
    url: `comment/likings/${target}`
  })
}

// 评论文章 对文章或者评论进行评论
// 可选参数
export const addComment = (data) => {
  return request({
    method: 'POST',
    url: 'comments',
    data
  })
}
