<template>
  <view class="container">
    <view class="title">取车密钥</view>
    <view class="key">{{key}}</view>
    <button class="copy-btn" @click="onCopy">复制</button>
    <view class="tip">请妥善保管您的取车密钥</view>
  </view>
</template>

<script>
	import{mapState}from 'vuex'
  export default {
    data() {
      return {
		  key:''
      };
    },
	async onShow() {
		const res=await uni.$http.post('/servlet06',{
			oppenId:uni.$getS('oppenId'),
			name:'curr'
		})
		this.key=res.number
	},
    methods: {
      onCopy() {
        uni.setClipboardData({
          data: this.key,
          success() {
            uni.showToast({
              title: "复制成功",
              icon: "none",
            });
          },
          fail() {
            uni.showToast({
              title: "复制失败，请重试",
              icon: "none",
            });
          },
        });
      },
    },
  };
</script>

<style lang="scss">
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
	margin-top: 2vh;
  }

  .title {
    font-size: 36rpx;
    font-weight: bold;
    margin-bottom: 20rpx;
  }

  .key {
    font-size: 60rpx;
    font-weight: bold;
    color: #333;
    padding: 20rpx;
    border: 2rpx solid #999;
    border-radius: 10rpx;
    margin-bottom: 20rpx;
  }

  .copy-btn {
    font-size: 28rpx;
    color: #fff;
    background-color: #12B876;
    border: none;
    border-radius: 10rpx;
    padding: 10rpx 20rpx;
    margin-bottom: 20rpx;
  }

  .tip {
    font-size: 24rpx;
    color: #999;
  }
</style>
