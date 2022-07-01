<template>
  <div>
    <div class="channel-container">
      <div class="title">
        <h3>我的频道</h3>
        <van-button
          plain
          type="danger"
          round
          size="mini"
          @click="isCloseShow = !isCloseShow"
          >{{ isCloseShow ? "完成" : "编辑" }}</van-button
        >
      </div>
      <van-row>
        <van-col span="6" v-for="(item, index) in channels" :key="item.id">
          <div
            class="inner"
            :style="{ color: active === index ? 'red' : '' }"
            @click="onClick(index)"
          >
            {{ item.name }}
            <!-- 经常切换用v-show  隐藏 -->
            <van-icon
              v-show="isCloseShow"
              name="close"
              v-if="index !== 0"
              :style="{ color: active === index ? 'red' : '' }"
            /></div
        ></van-col>
      </van-row>
    </div>

    <div class="channel-container">
      <div class="title">
        <h3>推荐频道</h3>
      </div>
      <van-row>
        <van-col span="6" v-for="item in recommendChannels" :key="item.id">
          <div class="inner van-ellipsis" @click="add(item.id)">
            +{{ item.name }}
          </div></van-col
        >
      </van-row>
    </div>
  </div>
</template>

<script>
import { setItem } from '@/utils/storage'
import { getAllArticleList, savaChannels } from '@/api/home'
const CHANNELS = 'CHANNELS'
export default {
  name: 'ChannelPanel',
  props: {
    channels: {
      type: Array,
      requestd: true
    },
    active: {
      type: Number,
      requestd: true
    }
  },
  async created () {
    try {
      const res = await getAllArticleList()
      console.log(res)
      this.recommendChannels = res.data.data.channels.filter(item => this.channels.every(item1 => item1.id !== item.id))
    } catch (err) {
      console.log(err)
    }
  },
  data () {
    return {
      recommendChannels: [],
      isCloseShow: false
    }
  },
  methods: {
    add (id) {
      const index = this.recommendChannels.findIndex(item => item.id === id)
      this.channels.push(this.recommendChannels[index])
      this.recommendChannels.splice(index, 1)
    },
    onClick (index) {
      if (this.isCloseShow) {
        if (index === 0) return // 推荐不能删除 排除
        // 删除
        const obj = this.channels[index]
        this.channels.splice(index, 1)
        this.recommendChannels.push(obj)
        if (index < this.active) {
          this.$emit('del-event', this.active - 1)
        }
      } else {
        // 切换高亮active
        this.$emit('change-active', index)
      }
    }
  },
  computed: {},
  watch: {
    channels: {
      async handler (newVal) {
        if (this.$store.state.user && this.$store.state.user.token) { // 登录过
          console.log(111)
          const arr = []
          newVal.forEach((item, index) => {
            arr.push({ id: item.id, seq: index })
          })
          console.log(arr)
          try {
            const res = await savaChannels(arr)
            console.log(res)
          } catch (err) {
            console.log(err)
          }
        } else { // 没有登录
          setItem(CHANNELS, newVal)
        }
        // console.log(newVal)
      },
      deep: true // 深度监听
    }
  },
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
    position: relative;
    .van-icon-close {
      position: absolute;
      right: 0;
      top: 0;
      transform: translate(50%, -50%);
    }
  }
}
</style>
