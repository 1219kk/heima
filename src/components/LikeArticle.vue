<template>
  <van-loading v-if="isLoading" size=".53333rem" />
  <van-icon
    v-else
    color="#777"
    :name="like_count ? 'good-job' : 'good-job-o'"
    @click="onClick"
  />
</template>

<script>
import { addLike, delLike } from '@/api/article'
export default {
  name: 'LikeArticle',
  props: {
    like_count: {
      type: [Number, Boolean],
      required: true
    }
  },
  created () { },
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    async onClick () {
      this.isLoading = true
      const target = this.$route.params.article_id
      if (this.like_count) {
        try {
          await delLike(target)
          this.$emit('update:like_count', !this.like_count)
        } catch (err) {
          console.log(err)
        }
      } else {
        try {
          await addLike(target)
          this.$emit('update:like_count', !this.like_count)
        } catch (err) {
          console.log(err)
        }
      }
      this.isLoading = false
    }
  }
}
</script>

<style scoped lang='less'>
</style>
