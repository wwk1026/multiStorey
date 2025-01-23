<template>
	<view class="" style="">
		<!-- 当前订单 -->
		<view class="container1" v-if=hasCurr>
			<view class="fistRow" style="color:grey;font-size: 12px;display:block;padding-top: 10px;">
				<view class="number" style="display: inline-block; margin-left: 7vw;">单号：{{currentId}}</view>
				<view class="status" style="float: right; margin-right: 7vw;color: #04A67E;font-weight: bold;">当前订单</view>
			</view>
			<view class="secondRow" style="margin-top: 20px;">
				<image src="../../static/listLogo2.png" style="margin-left: 7vw;width: 30px;height: 30px;" />
				<view style="line-height: 30px; float: right;  margin-right: 7vw;font-size: 12px;font-weight: bold;">
					¥{{parkingFee}}</view>
				<text
					style="line-height: 30px; float: right; margin-right:57vw;font-size: 14px;font-weight: bold;font-family:宋体;">停车</text>
			</view>
			<view class="thirdRow" style="margin-top: 20px;">
				<view style="float: left; font-size: 12px;color: grey;margin-left: 7vw;">开始时间:{{beginTime}}</view>
				<view style="float: right;margin-right: 7vw;font-size: 12px;color: grey;">已停:{{time}}</view>
			</view>
		</view>
		<!-- 历史订单 -->
		<view class="container1" v-for="item in hisList" :key="item.orderNum">
			<view class="fistRow" style="color:grey;font-size: 12px;display:block;padding-top: 10px;">
				<view class="number" style="display: inline-block; margin-left: 7vw;">单号：{{item.orderNum}}</view>
				<view class="status" style="float: right; margin-right: 7vw;">已支付</view>
			</view>
			<view class="secondRow" style="margin-top: 20px;">
				<image src="../../static/listLogo.png" style="float: left; margin-left: 7vw;width: 30px;height: 30px;" />
				<text
					style="line-height: 30px; display: inline-block; margin-left:1vw;padding-top: -30px; font-size: 14px;font-weight: bold;font-family:宋体;">停车</text>			
				<view style="line-height: 30px; float: right;  margin-right: 7vw;font-size: 12px;font-weight: bold;">
					¥{{item.expenses}}</view>
			</view>
			<view class="thirdRow" style="margin: 20px;">
				<view style="float: left; font-size: 12px;color: grey;">{{item.startTime}}-{{item.endTime}}</view>
				<view style="float: right;margin-right: 2vw;font-size: 12px;color: grey;">已抵扣 ¥{{item.discount}}</view>
			</view>
		</view>
		<view class="" style="color: grey;text-align:center">——近一个月暂无更多记录——</view>
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
				hisList:[],
				currentId:'',
				hasCurr:false,
				parkedTime2:0,
				timerID:''
			};
		},
		computed: {
			...mapState('m_time', ['beginTime', 'parkedTime','beginTime2']),
			...mapState('m_carId',['key']),
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
				this.updateMoney(parkingFee.toFixed(2))	
			  return parkingFee.toFixed(2);
			},
			time() {
				const hours = Math.floor(this.parkedTime2 / 3600);
				const minutes = Math.floor((this.parkedTime2 % 3600) / 60);
				const secs = Math.floor(this.parkedTime2 % 60);
				return hours+"小时"+minutes+"分"+secs+"秒"
			}
		},
		onShow() {
			this.updateBeginTime(uni.$getS('beginTime'))
			let timestamp = Date.now();
			this.parkedTime2=(timestamp-uni.$getS('beginTime2'))/1000;
			this.timerID = setInterval(() => {
				this.parkedTime2++;
			}, 1000);		
			var that=this;
			uni.getStorage({
				key: 'carKey',
				success: res => {
					if (res.data) {
						that.updateCarKey(res.data)
					}
				}
			})
			uni.getStorage({
				key: 'oppenId',
				success: res => {
					if (res.data) {
						that.getHisList(res.data)
					}
				}
			})
		},
		onHide() {
			clearInterval(this.timerID);
		},
		methods: {
			...mapMutations('m_time', ['updateBeginTime', 'updateParkedTime', 'updateEndTime','updateMoney']),
			...mapMutations('m_carId',['updateCarKey']),
			async getHisList(oppenId){
				const res= await uni.$http.post('/servlet06', {
					oppenId:oppenId,
					name:'curr'
				})
				console.log(res.number)
				if(res.number){
					this.hasCurr=true
				}
				this.hisList= await uni.$http.post('/servlet06', {
					oppenId:oppenId,
					name:'history'
				})		
				if(this.hisList)
				this.currentId=this.hisList[0].orderNum+1
				else this.currentId='01'			
			}
		},
		onPullDownRefresh() {
			var that=this;
			uni.getStorage({
				key: 'oppenId',
				success: res => {
					if (res.data) {
						that.getHisList(res.data)
					}
				}
			})
			setTimeout(function() {
				uni.stopPullDownRefresh()
			}, 1000)
		}
	}
</script>

<style lang="scss">
	.container1 {
		margin: 10px auto;
		background-color: #F9F9F9;
		border-radius: 10rpx;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		width: 95%;
		height: 16vh;
	}
</style>
