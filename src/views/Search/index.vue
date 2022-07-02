<template>
  <div>
    <form action="/"></form>
    <van-search
      v-model="searchText"
      show-action
      background="#3296fa"
      placeholder="请输入搜索关键词"
      @cancel="$router.go(-1)"
      @search="onSearch"
      @focus="isSearch = false"
      autofocus
    />
    <SearchHistory v-if="searchText === ''" @search="onSearch"></SearchHistory>
    <template v-else>
      <SearchResult v-if="isSearch" :searchText="searchText"></SearchResult>
      <SearchSuggest
        v-else
        :searchText="searchText"
        @search="onSearch"
      ></SearchSuggest>
    </template>
  </div>
</template>

<script>
import SearchHistory from './commponents/SearchHistory'
import SearchResult from './commponents/SearchResult'
import SearchSuggest from './commponents/SearchSuggest'

export default {
  created () { },
  data () {
    return {
      searchText: '',
      isSearch: false
    }
  },
  methods: {
    onSearch (str) {
      this.searchText = str
      this.isSearch = true
      this.$store.commit('setsearchHistoryList', str)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { SearchSuggest, SearchHistory, SearchResult }
}
</script>

<style scoped lang='less'>
</style>
