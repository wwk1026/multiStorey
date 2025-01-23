<template>
	<view>
		<image src="https://www.usparkinglot.xyz:8443/parklot/img/activeBgc1.jpg" style="z-index: -1; width: 100%; height: 100%;position: absolute;">
		</image>
		<image src="https://www.usparkinglot.xyz:8443/parklot/img/newPeople.png" style="width: 100%;" />
		<image src="https://www.usparkinglot.xyz:8443/parklot/img/bag2.png" style="width: 160%;height: 150%;float: left;margin-left: -30vw;"
			mode="widthFix" />
		<button v-if="isGet" type=""
			style="width: 50%; margin-left: 25vw; margin-top: -70px; border: 3px solid #000;border-radius: 100px;float: left;background-color: #DEDEDE;color: grey;"
			@click="gottenGift">已领取</button>
		<button v-else=""
			style="width: 50%; margin-left: 25vw; margin-top: -70px; border: 3px solid #000;border-radius: 100px;float: left;background-color: #CDF830;"
			@click="getGift">领取</button>
		<view class="container1">
			<view style="margin-left:0vw;">1.活动时间：即日起至2023年4月30日 </view>
			<view style="margin-left:0vw;">2.活动范围：仅限立体停车小程序内使用</view>
		</view>
		<view class="container1">
			<view style="">1.本活动同一用户、同一账号仅可领取一次。</view>
			<view style="">2.立体停车小程序内各优惠不可叠加使用</view>
			<view>3.首次领取优惠券后,在活动期间,每日将自动获得"支付宝5折打水券"1张(当日有效），无需重复领取。</view>
			<view>4.该优惠券仅限使用立体停车小程序扫码停车时可享，其他渠道或支付方式不可使用该优惠。</view>
			<view>5.优惠养领取记录可在「立体停车小程序 -我的-我的卡包」中查看。</view>
			<view>6.其他活动问题，可通过立体停车小程序 一联系客服”或拨打18379091906联系我们。</view>
			<view>7.平台保留对使用不正当方式获取活动奖励的账号采取包括取消奖励、警告乃至封禁处理的权利,在法律允许范国内保留最终解释权</view>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				isGet: '',
				oppenId: ''
			};
		},
		onShow() {
			uni.getStorage({
				key: 'isGet',
				success: res => {
					if (res.data) {
						this.isGet = res.data
					}
				}
			})
			uni.getStorage({
				key: 'oppenId',
				success: res => {
					if (res.data) {
						this.oppenId = res.data
					}
				}
			})
		},
		methods: {
			...mapMutations('m_user', ['updateIsGet']),
		async isGetCoupon(){
				await uni.$http.post('/servlet06',{
					oppenId:this.oppenId, 
					name:'add2'
				})
			},
			getGift() {
				if (this.oppenId) {
					this.isGetCoupon()
					this.updateIsGet(true)
					this.isGet = true;
					uni.$showT('领取成功','success')
				}else{
					uni.showToast({
						title:'请先完成登录!',
						icon:'none'
					})
				}
			},
			gottenGift() {
				uni.showToast({
					title: '已领取,请勿重复领取',
					icon: 'none'
				})
			}
		}
	}
</script>

<style lang="scss">
	.container1 {
		color: grey;
		font-size: 12px;
		max-width: 700rpx;
		margin: 20px auto;
		padding: 40rpx;
		background-color: #fff;
		border-radius: 8%;
		text-align: left;
		line-height: 30px;
		box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
	}
</style>
