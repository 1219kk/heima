<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <CommentItem
        v-for="item in commentList"
        :key="item.com_id"
        :item="item"
      ></CommentItem>
    </van-list>
  </div>
</template>

<script>
import { getCommentList } from '@/api/comment'
import CommentItem from './CommentItem.vue'
export default {
  // 可以用在文章评论也可以用在评论的评论
  props: {
    type: {
      type: String,
      required: true,
      // props自定义函数校验
      validator (value) {
        // return ['a', 'c'].indexOf(value) !== -1
        return ['a', 'c'].includes(value)// 数据只能是a或者c才可以验证通过
      }
    },
    source: {
      type: [Number, String],
      required: true
    },
    // 传给index.vue
    commentList: {
      type: Array,
      required: true
    }
  },
  created () {
    this.getCommentList()
  },
  data () {
    return {
      paramObj: {
        source: this.source,
        type: this.type,
        limit: 5,
        offset: null
      },
      // commentList: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    async getCommentList () {
      try {
        const res = await getCommentList(this.paramObj)
        console.log(res)
        // 数据已经全部加载完毕 则直接讲finished设置为true
        // 判断数据是否加载完毕
        if (res.data.data.results.length === 0) {
          this.finished = true
        }
        this.$emit('set-count', res.data.data.total_count)
        // 保留每一页数据
        this.commentList.push(...res.data.data.results)
        this.paramObj.offset = res.data.data.last_id
        // 当前页面数据拿回来就把loading设置的转圈效果关闭
        this.loading = false
      } catch (err) { console.log(err) }
    },
    onLoad () {
      this.getCommentList()// 获取下一页数据
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { CommentItem }
}
</script>

<style scoped lang='less'>
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>
