<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <template v-if="isDelect">
        <span @click="$store.commit('delHistory')">全部删除</span>&nbsp;&nbsp;
        <span @click="isDelect = false">完成</span>
      </template>
      <van-icon name="delete" @click="isDelect = true" v-else />
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in searchHistoryList"
      :key="index"
      @click="$emit('search', item)"
    >
      <van-icon
        name="close"
        v-if="isDelect"
        @click.stop="$store.commit('delHistory', index)"
      />
    </van-cell>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'SearchHistory',
  components: {},
  props: {},
  data () {
    return {
      isDelect: false
    }
  },
  computed: {
    ...mapState(['searchHistoryList'])
  },
  watch: {},
  created () { },
  mounted () { },
  methods: {}
}
</script>

<style scoped lang="less"></style>
