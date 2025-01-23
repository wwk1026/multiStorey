<template>
  <view class="container">
    <swiper class="swiper" indicator-dots autoplay circular >
      <swiper-item>
        <image class="swiper-img" src="https://www.usparkinglot.xyz:8443/parklot/img/gift.png" @click="gotoNewPeople"></image>
      </swiper-item>
      <swiper-item >
        <image class="swiper-img" src="https://www.usparkinglot.xyz:8443/parklot/img/gift2.png" @click="gotoSpring"></image>
      </swiper-item>
    </swiper>
 <view class="desc">
   <view class="title" style="color: #ff6c00;">新用户专享优惠券</view>
   <view class="sub-title" style="color: #999;">仅限新用户首次使用</view>
   <view class="content" style="color: #333;">在活动期间，首次使用本小程序的新用户可以领取一张优惠券，抵扣停车费用。</view>
   
   <view class="title" style="color: #0099ff;">春日大礼包</view>
   <view class="sub-title" style="color: #999;">限时抢购，先到先得</view>
   <view class="content" style="color: #333;">活动期间，每个用户可以抢购一份春日大礼包，内含多张停车券、洗车券等优惠券，数量有限，先到先得。</view>
 
   <view class="title" style="color: #00cc99;">洗车增值服务</view>
   <view class="sub-title" style="color: #999;">每个用户每月限领一次</view>
   <view class="content" style="color: #333;">在活动期间，每个用户每月可以领取一次洗车券，享受停车场免费洗车服务，让您的爱车更加亮丽。</view>
 </view>

  </view>
</template>

<script>
	export default {
		data() {
			return {
			};
		},
		methods:{
			gotoNewPeople(){
				uni.navigateTo({
					url:'/pages/newPeople/newPeople'
				})
			},
			gotoSpring(){
				uni.navigateTo({
					url:'/pages/springActive/springActive'
				})
			}
		}

	}
</script>



<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20rpx;
  }
  .swiper {
    width: 100%;
    height: 250rpx;
    margin-bottom: 20rpx;
  }
.swiper-img {
width: 100%;
height: 100%;
border-radius: 10rpx;
}
.desc {
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
}
.title {
font-size: 32rpx;
font-weight: bold;
margin-bottom: 10rpx;
}
.sub-title {
font-size: 24rpx;
color: #999;
margin-bottom: 10rpx;
text-align: center;
width: 100%;
}
.content {
font-size: 28rpx;
color: #333;
margin-bottom: 10rpx;
text-align: left;
width: 100%;
}
</style>
