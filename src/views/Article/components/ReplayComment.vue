<template>
  <div>
    <!-- 模板中不能有太多逻辑 -->
    <van-nav-bar :title="title" left-arrow @click-left="$emit('close')" fixed>
      <template #left> <van-icon name="cross" /></template
    ></van-nav-bar>
    <CommentItem :item="comment" class="comment"></CommentItem>
    <van-cell title="全部回复" />
    <CommentItem
      :item="item"
      v-for="item in list"
      :key="item.com_id"
      class="comment1"
    ></CommentItem>
    <div class="comment1"></div>
    <div class="bottom">
      <van-button
        type="default"
        block
        round
        plain
        @click="isAddCommentShow = true"
        >评论</van-button
      >
    </div>

    <!-- 新添加评论  弹出层 -->
    <!-- unshift 放在前面 -->
    <!-- 计算属性 只要他依赖的data中数据变了 就会变 -->
    <van-popup position="bottom" v-model="isAddCommentShow">
      <AddComment
        v-if="isAddCommentShow"
        :target="comment.com_id"
        :art_id="$route.params.article_id"
        @add-comment="
          list.unshift($event);
          isAddCommentShow = false;
          comment.reply_count++;
        "
      ></AddComment>
    </van-popup>
  </div>
</template>

<script>
import AddComment from './AddComment.vue'
import { getCommentList } from '@/api/comment'
import CommentItem from './CommentItem.vue'
export default {
  props: {
    comment: {
      type: Object,
      default: () => ({})
    }
  },
  created () {
    this.getCommentList1()
  },
  data () {
    return {
      offset: null,
      limit: 9999,
      list: [],
      isAddCommentShow: false

    }
  },
  methods: {
    async getCommentList1 () {
      try {
        const res = await getCommentList({ type: 'c', source: this.comment.com_id, offset: this.offset, limit: this.limit })
        this.list = res.data.data.results
        console.log(res)
      } catch (err) { console.log(err) }
    }
  },
  computed: {
    title () {
      const count = this.comment.reply_count
      if (this.comment.reply_count === 0) {
        return '暂无回复'
      } else {
        return count + '条回复'
      }
    }
  },
  watch: {},
  filters: {},
  components: { CommentItem, AddComment }
}
</script>

<style scoped lang='less'>
.comment {
  margin-top: 92px;
}
.bottom {
  height: 110px;
  width: 750px;
  position: fixed;
  bottom: 0;
  padding: 10px 30px;
  box-sizing: border-box;
  background-color: pink;
}
.comment1 {
  margin-bottom: 110px;
}
</style>
