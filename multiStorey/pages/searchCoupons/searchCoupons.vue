<template>
	<view class="">
		<view class="container1" v-for="item in coupons" :key="item.id" @click="useCoupon(item.dis,item.id)">
			<view class="fistRow" style="color:grey;font-size: 12px;display:block;padding-top: 10px;">
				<view class="number" style="display: inline-block; margin-left: 7vw;">券号：{{item.id}}</view>
				<view v-if="item.id==id" class="status" style="float: right; margin-right: 7vw;color:gray;">已选择</view>
				<view v-else class="status" style="float: right; margin-right: 7vw;color: coral;">可使用</view>
			</view>
			<view class="secondRow" style="margin-top: 20px;">
				<image src="../../static/coupon.png" style="margin-left: 7vw;width: 30px;height: 30px;" />
				<view v-if="item.dis==1"
					style="line-height: 30px; float: right;  margin-right: 7vw;font-size: 12px;font-weight: bold;color: #12B876;">
					一折券</view>
				<view v-if="item.dis==5"
					style="line-height: 30px; float: right;  margin-right: 7vw;font-size: 12px;font-weight: bold;color: #12B876;">
					五折券</view>
				<text
					style="line-height: 30px; float: right; margin-right:55vw;font-size: 13px;font-weight: bold;font-family:宋体;">停车</text>
			</view>
			<view class="thirdRow" style="margin-top: 15px;">
				<view
					style="float: left; font-size: 12px;color: #12B876;margin-left: 7vw;border: 1px solid #12B876;border-radius: 10%;padding-bottom:-6px;">
					立体停车
				</view>
				<view style="float: right;margin-right: 7vw;font-size: 12px;color: grey;">有效期至2023.4.30</view>
			</view>
		</view>
		<view class="" style="color: grey;text-align:center">——已显示所有优惠券——</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				selected:false,
				coupons: [
				]
			};

		},
		computed: {
			...mapState('m_time', ['discount', 'id'])
		},
		onShow() {
			var that=this;
			uni.getStorage({
				key: 'oppenId',
				success: res => {
					if (res.data) {
						that.getCoupons(res.data)
					}
				}
			})
		},
		methods: {
			...mapMutations('m_time', ['updateDiscount', 'updateId']),
		async getCoupons(oppenId){
				this.coupons=await uni.$http.post('/servlet06',{
					oppenId:oppenId,
					name:'get'
				})
			},
			useCoupon(dis, id) {
				var that = this;
				uni.showModal({
					title: '是否使用',
					content: '券号:' + id + '--' + dis + '折券',
					cancelText: '取消',
					cancelColor: '#999',
					confirmText: '确认',
					confirmColor: '#12B876',
					success(res) {
						if (res.confirm) {
							that.updateDiscount(dis)
							that.updateId(id)
						} else {
							that.updateDiscount(null)
							that.updateId(null)
						}
						uni.navigateBack({
							data: -1
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.container1 {
		margin: 10px auto;
		background-color: #F9F9F9;
		border-radius: 10rpx;
		box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
		width: 95%;
		height: 16vh;
	}
</style>
