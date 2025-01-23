<template>
	<view class="">
		<!-- <view class="" style="color: grey;text-align:center">***当前订单***</view> -->
		<view class="container1" style="background-color:aliceblue;">
			<view class="fistRow" style="color:grey;font-size: 12px;display:block;padding-top: 10px;">
				<view class="number" style="display: inline-block; margin-left: 7vw;">单号：{{currentId}}</view>
				<view class="status" style="float: right; margin-right: 7vw;color: #04A67E;font-weight: bold;">当前订单
				</view>
			</view>
			<view class="secondRow" style="margin-top: 20px;">
				<image src="https://www.usparkinglot.xyz:8443/parklot/img/listLogo2.png" style="margin-left: 7vw;width: 30px;height: 30px;" />
				<view style="line-height: 30px; float: right;  margin-right: 7vw;font-size: 12px;font-weight: bold;">
					¥{{parkingFee}}</view>
				<text
					style="line-height: 30px; float: right; margin-right:57vw;font-size: 14px;font-weight: bold;font-family:宋体;">停车</text>
			</view>
			<view class="thirdRow" style="margin-top: 20px;">
				<view style="float: left; font-size: 12px;color: grey;margin-left: 7vw;">开始时间:{{beginTime}}</view>
				<view style="float: right;margin-right: 7vw;font-size: 12px;color: grey;">已停:{{time}}</view>
			</view>

			<view class="" style="margin: 80px auto;">
				<view class="list1">
					<text style="float: left; font-size: 14px;color:coral;margin-left: 7vw;">使用优惠券</text>
					<view class="" @click="useCoupon">
						<view v-if="discount!=null" style="float: left; font-size: 12px;color:grey;margin-left: 46vw;">{{discount}}折优惠</view>
						<view v-else="" style="float: left; font-size: 12px;color:grey;margin-left: 46vw;">点击查看</view>
						<uni-icons type="arrowright" size="15"
							style="float: left; margin-left: 2vw;font-size: 13px;color: grey;" color="grey"></uni-icons>
					</view>
				</view>
			</view>
			
			<view class="pay" style="margin-top: -90px;margin-bottom: 110px;background-color: aliceblue;">
				<view class="" style="float: left; font-size: 14px;margin-left:48vw;color: gray;">
					已优惠:<view class="" style="color: red;float: right;">
						¥{{fee}}
					</view>
				</view>
				<view class="" style="float: right; font-size: 14px;margin-right: 7vw;">
					合计:¥{{endFee}}
				</view>
			</view>
			<view class="" style="padding-bottom: 10px;">
				<button type="" class="btn-login" @click="pay">去支付</button>
			</view>
		</view>

		<view class="container1">
			<swiper class="swiper" autoplay circular>
				<swiper-item>
					<image class="swiper-img" src="https://www.usparkinglot.xyz:8443/parklot/img/gift.png" @click="gotoNewPeople"></image>
				</swiper-item>
				<swiper-item>
					<image class="swiper-img" src="https://www.usparkinglot.xyz:8443/parklot/img/gift2.png" @click="gotoSpring"></image>
				</swiper-item>
			</swiper>
		</view>
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
				currentId:'',
				parkedTime2:0,
				timerID:'',
				key:''
			};
		},
		  onLoad: function (options) {
			  this.key=options.secret
		},
		onShow() {
			this.updateBeginTime(uni.$getS('beginTime'))
			let timestamp = Date.now();
			this.parkedTime2=((timestamp-uni.$getS('beginTime2'))/1000);
			this.timerID = setInterval(() => {
				this.parkedTime2++;				
			}, 1000);
			var that=this;
			uni.getStorage({
				key: 'money',
				success: res => {
					// console.log(res.data)
					if (res.data) {
						this.money = res.data
					}
				}
			})			
			uni.getStorage({
				key: 'oppenId',
				success: res => {
					// console.log(res.data)
					if (res.data) {
						that.updateOppenId(res.data)
						that.getHisList(res.data)
					}
				}
			})
		},
		onHide() {
			clearInterval(this.timerID);
		},
		computed: {
			...mapState('m_time', ['beginTime', 'parkedTime','discount','id','beginTime2']),
			...mapState('m_user',['oppenId']),
			parkingFee() {
				// const freeParkingThreshold = 15 * 60; // 15分钟内免费停车
				const freeParkingThreshold = 3; // 15分钟内免费停车
				const first4HoursFee = 6; // 停车1-4小时每车收取6元
				const hourlyFeeAfter4Hours = 1.5; // 停车4小时以上每车每小时加收1.5元
				const maxFeeWithin24Hours = 20; // 24小时内停车费用封顶20元
				// 计算停车时间（小时）
				const parkingTimeInHours = this.parkedTime2 / 3600;
				// 计算停车费用
				let parkingFee = 0;
				if (this.parkedTime2 <= freeParkingThreshold) {
					parkingFee = 0; // 15分钟内免费停车
				} else if (parkingTimeInHours <= 4) {
					parkingFee = first4HoursFee; // 停车1-4小时每车收取6元
				} else {
			  parkingFee = first4HoursFee + hourlyFeeAfter4Hours * (parkingTimeInHours - 4); // 停车4小时以上每车每小时加收1.5元
					parkingFee = Math.min(parkingFee, maxFeeWithin24Hours); // 24小时内停车费用封顶20元
				}
				return parkingFee.toFixed(2);
			},
			fee(){
				if(this.discount)			
				return ((100-this.discount*10)*0.01*this.parkingFee).toFixed(2);
				else return 0.00
			},
			endFee(){
				return (this.parkingFee-this.fee).toFixed(2)
			},
			time() {
				const hours = Math.floor(this.parkedTime2 / 3600);
				const minutes = Math.floor((this.parkedTime2 % 3600) / 60);
				const secs = Math.floor(this.parkedTime2 % 60);
				return hours + "小时" + minutes + "分" + secs + "秒"
			}
		},
		methods: {
			...mapMutations('m_carId',['updateCarKey']),
			...mapMutations('m_user',['updateOppenId']),
			...mapMutations('m_time',['updateBeginTime']),
			useCoupon() {
				uni.navigateTo({
					url:'../../pages/searchCoupons/searchCoupons'
				})
			},
			gotoNewPeople() {
				uni.navigateTo({
					url: '/pages/newPeople/newPeople'
				})
			},
			gotoSpring() {
				uni.navigateTo({
					url: '/pages/springActive/springActive'
				})
			},
			sendDis(){
				let dis,id;
				if(this.id)
				id=this.id.toString()
				else id='';
				if(!this.discount){
					dis='10'
				}else{
					dis=this.discount.toString()
				}
				var that=this;				
				uni.request({ 
					url: 'https://www.usparkinglot.xyz:8443/parklot/servlet07',
					method: 'POST',
					data: {
						code:dis,
						oppenId: that.oppenId,
						secretKey: that.key,
						number:id,
					},
					success(e) {
						console.log('结算成功')
					},fail(){
						console.log("请求失败")
					},
					})
			},
			getHisList(oppenId){
				var that=this;
				uni.request({
					url:'https://www.usparkinglot.xyz:8443/parklot/servlet06',
					method:'POST',
					data:{
						oppenId:oppenId,
						name:'history'
					},
					success(res) {
						that.currentId=res.data[0].orderNum+1
					}
				})
			},
			async pay(){				
				var that=this;
				uni.showModal({
					title: '支付提醒',
					cancelText: '取消',
					cancelColor: '#999',
					confirmText: '确认支付',
					confirmColor: '#12B876',
					editable: true,
					placeholderText: '请输入支付密码',
					success(res) {
						if(res.confirm){
							if(res.content=='123456'){
								//清除密钥
								that.sendDis()
								uni.showLoading({
									title:'支付中...'
								})
								setTimeout(function(){
									uni.hideLoading()
									uni.showToast({
										title:'支付成功',
										icon:'success'
									})								
									uni.reLaunch({
										url:'/pages/home/home'
									})
									uni.$showT('取车成功','success')
								},3000)
							}else{
								uni.showToast({
									title:'支付失败!',
									icon:'error'
								})
							}
						}
					}		
				})
			},
		}

	}
</script>



<style lang="scss">
	.btn-login {
		width: 20%;
		border-radius: 100px;
		margin: 20px 72vw;
		background-color: #12B876;
		font-size: 12px;
		color: #fff;
		margin-bottom: 10px;
		
	}
	.list1 {
		display: flex;
		margin-top: 20rpx;
		height: 113rpx;

		.wallet {
			padding: 35.5rpx 36rpx 35.5rpx 20rpx;
			width: 42rpx;
			height: 42rpx;
		}

		.text1 {
			padding-top: 35rpx;
			font-size: 13px;
			color: grey;
		}

		.icon1 {
			padding-top: 35rpx;
			padding-left: 486rpx;
		}
	}

	.pay-button {
		width: 200px;
		height: 50px;
		line-height: 50px;
		text-align: center;
		border-radius: 25px;
		background-color: #12B876;
		color: #fff;
		cursor: pointer;
		transition: all 0.2s;
	}

	.container1 {
		margin: 10px auto;
		background-color: #F9F9F9;
		border-radius: 10rpx;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		width: 95%;
		// height: 36vh;
	}

	.swiper {
		width: 100%;
		height: 250rpx;
		// margin-top: -100rpx;
	}

	.swiper-img {
		width: 100%;
		height: 100%;
		border-radius: 10rpx;
	}
</style>
