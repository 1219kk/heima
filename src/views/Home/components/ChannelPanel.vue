<template>
  <div>
    <div class="channel-container">
      <div class="title">
        <h3>我的频道</h3>
        <van-button plain type="danger" round size="mini">编辑</van-button>
      </div>
      <van-row>
        <van-col span="6" v-for="item in channels" :key="item.id">
          <div class="inner">{{ item.name }}</div></van-col
        >
      </van-row>
    </div>

    <div class="channel-container">
      <div class="title">
        <h3>推荐频道</h3>
      </div>
      <van-row>
        <van-col span="6"> <div class="inner">+111</div></van-col>
        <van-col span="6"> <div class="inner">+111</div></van-col>
        <van-col span="6"> <div class="inner">+111</div></van-col>
        <van-col span="6"> <div class="inner">+111</div></van-col>
        <van-col span="6"> <div class="inner">+111</div></van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    channels: {
      type: Array,
      requestd: true
    }
  },
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.channel-container {
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 24px;
    padding-right: 16px;
    margin-bottom: 15px;
    h3 {
      color: #333333;
      font-size: 32px;
      font-weight: normal;
    }
    .van-button {
      width: 104px;
      height: 48px;
      border-radius: 20px;
    }
  }
  .inner {
    width: 160px;
    height: 86px;
    background-color: #f4f5f6;
    border-radius: 6px;
    font-size: 28px;
    font-weight: normal;
    color: #222222;
    text-align: center;
    line-height: 86px;
    margin-left: 14px;
    margin-bottom: 22px;
  }
}
</style>
