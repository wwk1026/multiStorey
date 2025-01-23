<template>
<view class="container">
  <view class="title">停车计费</view>
  <view class="rule">1. 停车1-4小时，每车收取停车费标准为<text class="highlight">6元</text>，其中：停车在15分钟内的免收停车费（含15分钟）。</view>
  <view class="rule">2. 停车4小时以上，每车每小时加收<text class="highlight">1.5元</text>，24小时内封顶<text class="highlight">20元</text>。</view>
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
    max-width: 600rpx;
    margin: 20px auto;
    padding: 40rpx;
    background-color: #fff;
    box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
  }

  .title {
    font-size: 36rpx;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20rpx;
  }

  .rule {
    font-size: 28rpx;
    line-height: 1.5;
    margin-bottom: 10rpx;
  }

  .highlight {
    color: #ff6600;
    font-weight: bold;
  }
</style>
