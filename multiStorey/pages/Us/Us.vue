<template>
<view class="container">
  <view class="team-info">
    <image class="logo" src="../../static/us.png"></image>
    <text class="title">南昌航空大学团队 </text>
    <text class="slogan">创新、协作、进取</text>
  </view>
  <view class="intro">
    <text class="subtitle">欢迎使用停车小程序！</text>
    <text class="text">我们致力于为用户提供便捷和高效的停车服务体验。我们的团队由来自不同专业和背景的学生组成，拥有丰富的技术和设计经验。我们注重用户体验，致力于开发出用户友好、易于使用的停车小程序。在未来的发展中，我们将不断完善和更新我们的停车小程序，致力于成为用户最信赖、最便捷的停车服务平台。</text>
  </view>
</view>



</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
.container {
  margin: 20rpx;
  background-color: #F9F9F9;
  border-radius: 10rpx;
  box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
  padding: 40rpx 20rpx;
}

.team-info {
  display: flex;
  align-items: center;
  margin-bottom: 30rpx;
}

.logo {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  margin-right: 30rpx;
}

.title {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
  color: #333333;
}

.slogan {
  font-size: 28rpx;
  color: #999999;
  margin-bottom: 20rpx;
}

.subtitle {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
  color: #333333;
}

.text {
  font-size: 28rpx;
  line-height: 1.5;
  color: #666666;
}



</style>
