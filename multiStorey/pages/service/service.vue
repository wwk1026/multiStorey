<template>
	<view>
		 <button open-type="contact"  class="service" style="font-size: 16px;color: white;">联系客服</button>
		 <text @click="call" class="phone" >电话联系?</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			call(){
				uni.makePhoneCall({
				// 手机号
				phoneNumber:"18379091906",
				// 成功回调
				success: (res) => {},
				// 失败回调
				fail: (res) => {console.log("请求失败")}
				});
			}
		}
	}
</script>

<style lang="scss">
.service{
	height: 82rpx;
	width: 600rpx;
	background-color: #04A67E;
	border-radius: 42rpx;
	text-align: center;
	line-height: 84rpx;
	margin: 32rpx auto;
}
.phone{
	text-decoration: underline; 
	color: darkgrey;
	margin-left:325rpx;
	font-size: 13px;
}
</style>
