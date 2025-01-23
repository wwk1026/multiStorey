<template>
	<view class="container">
		<!-- 遮罩层 -->
		<view class="mask" v-if="loading"></view>
		<!-- 地图组件 -->
		<map id="map" :longitude="longitude" :latitude="latitude" :markers="showMarkers ? markers:[]" max-scale="20"
			:scale="scale" show-location="true" enable-traffic="true" polygon="points" @markertap="onMarkerTap">
			<!-- 跳转个人主页图标 -->
			<view class="my-photo" @click="gotoMyPage">
				<uni-icons type="person" size="25" color=rgba(0,0,0,0.5)></uni-icons>
			</view>
			<!-- 地图定位当前位置图标 -->
			<view class="location-box">
				<image class="circle" src="../../static/circle.png" @click="clickLocation"></image>
			</view>
			<!-- 客服图标 -->
			<navigator url="../service/service">
				<view url="/pages/service/service" class="service-box">
					<image src="../../static/service.png" class="service"></image>
				</view>
			</navigator>
			<!-- 搜索附近停车点 -->
			<view class="search-box">
				<image src="../../static/search.png" class="search" @click="searchParing"></image>
			</view>
			<view class="big-box">
				<!-- 动态字体滚动 -->
				<uni-notice-bar show-icon scrollable backgroundColor="#334A60" text="立体停车小程序上线福利,新用户可以享受48小时免费停车!" />
				<view class="medium-box">
					<!-- 取车按钮 -->
					<view class="btn-box">
						<img src="../../static/1.png" alt="" class="button1" v-bind:class="{green:isGreen1}"
							@click="getCar">
						<img src="../../static/2.png" alt="" class="button2" v-bind:class="{green:isGreen2}"
							@click="helpGetCar">
					</view>
					<!-- 指南，活动，计价规则 -->
					<view class="function-icon">
						<view class="comopass" @click="gotoCompass">
							<img class="comopassIcon" src="https://www.usparkinglot.xyz:8443/parklot/img/compass.png"
								alt="">
							<view class="comopassText">
								使用指南
							</view>
						</view>
						<view class="active" @click="gotoActive">
							<img class="activeIcon" src="https://www.usparkinglot.xyz:8443/parklot/img/active.png"
								alt="">
							<view class="activeText">
								特惠活动
							</view>
						</view>
						<view class="chargeRule" @click="gotoChargeRule">
							<img class="chargeRuleIcon" src="https://www.usparkinglot.xyz:8443/parklot/img/chargeRule.png"
								alt="">
							<view class="chargeRuleText">
								计费规则
							</view>
						</view>
					</view>
					<!-- 扫码取车 -->
					<button type="primary" @click="btnScan" id="btn-scan" style="font-size: 16px;">扫码停车</button>
				</view>
			</view>
		</map>
	</view>
</template>

<script>
	//范围经纬度,南昌航空大学
	// 115.824919,28.659011
	// 115.824919,28.659011
	//115.83105,28.644987
	//115.825664,28.6393
	// 115.819742,28.645043
	//江西中医药大学
	//115.870302,28.652176
	//115.872952,28.650994
	//115.872748,28.653042
	import {
		mapMutations,
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				isGet:false,
				timerID: '',
				id: '',
				oppenId: '',
				loading: false,
				scale: '16',
				login: false,
				isGreen1: true,
				isGreen2: false,
				longitude: 115.824814,
				latitude: 28.652639,
				showMarkers: false,
				markers: [{
						id: 0,
						longitude: 115.824814,
						latitude: 28.652639,
						title: '19栋停车点',
						iconPath: '/static/marker.png',
						callout: {
							content: "19栋停车点",
							borderRadius: 10,
							padding: 10,
							color: '#fff',
							bgColor: 'rgba(18, 184, 118, 0.5)',
							display: "BYCLICK",
						},

					},
					{
						id: 1,
						longitude: 115.871595,
						latitude: 28.651959,
						title: '2江西中医药大学停车点',
						iconPath: '../../static/marker.png',
						callout: {
							content: "江西中医药大学停车点",
							borderRadius: 10,
							padding: 10,
							color: '#fff',
							bgColor: 'rgba(18, 184, 118, 0.8)',
							display: "BYCLICK",
						},
					},
					{
						id: 2,
						longitude: 115.828535,
						latitude: 28.651069,
						title: '图书馆停车点',
						iconPath: '../../static/marker.png',
						callout: {
							content: "图书馆停车点",
							borderRadius: 10,
							padding: 10,
							color: '#fff',
							bgColor: 'rgba(18, 184, 118, 0.5)',
							display: "BYCLICK",
						},
					},
				]
			}
		},
		computed: {
			...mapState('m_carId', ['key']),
		},
		onShow() {
			var that = this;
			this.oppenId = uni.$getS('oppenId')
			that.updateCarKey(uni.$getS('carKey'))
			this.id = uni.$getS('carId')
			//定时检测缩放是否改变
			that.intervalId = setInterval(() => {
				//获取缩放
				uni.createMapContext("map", this).getScale({
					success: (res) => {
						if (that.scale = !res) {
							that.scale = res
						}
					}
				})
			}, 500)
			this.getMyLocation()
		},
		onHide() {
			if (this.intervalId) {
				clearInterval(this.intervalId);
				this.intervalId = null;
			}
		},
		onLoad() {
			this.getMyLocation()
			uni.createMapContext("map", this).moveToLocation({
				//将地图中心转移到当前位置
				latitude: this.latitude,
				longitude: this.longitude
			})
		},
		methods: {
			...mapMutations('m_carId', ['updateCarId', 'updateCarKey']),
			...mapMutations('m_time', ['updateBeginTime', 'updateParkedTime', 'updateEndTime']),
			gotoCompass() {
				uni.navigateTo({
					url: '/pages/compass/compass'
				})
			},
			gotoActive() {
				uni.navigateTo({
					url: '/pages/active/active'
				})
			},
			gotoChargeRule() {
				uni.navigateTo({
					url: '/pages/chargeRule/chargeRule'
				})
			},
			async getSetting() {
				let that = this;
				return new Promise((resolve, reject) => {
					uni.getSetting({
						success(res) {
							// 如果没有授权
							if (!res.authSetting['scope.userLocation']) {
								// 则拉起授权窗口
								uni.authorize({
									scope: 'scope.userLocation', //地理定位
									success() {
										resolve(true);
										//点击允许后--就一直会进入成功授权的回调 就可以使用获取的方法了
										uni.getLocation({
											type: 'gcj02',
											success: function(res) {
												that.longitude = res.longitude
												that.latitude = res.latitude
												uni.showToast({
													title: '定位获取成功!',
													icon: 'success',
													mask: true
												})
											},
											fail(error) {
												console.log('失败', error)
											}
										})
									},
									fail(error) {
										resolve(false);
									}
								})
							} else {
								// 有权限则直接获取
								uni.getLocation({
									type: 'gcj02',
									success: function(res) {
										that.longitude = res.longitude
										that.latitude = res.latitude
									},
									fail(error) {
										uni.$showT('请勿频繁调用')
										console.log('定位获取失败', error)
									}
								})
							}
						}
					})
				})
			},
			async getMyLocation() {
				// 获取用户是否开启 授权获取当前的地理位置、速度的权限。
				let res = await this.getSetting()
				if (!res) {
					let result = await uni.$showM('提示', '若不授权，将无法使用位置功能', '不授权', '授权', '#999', '#f94218')
					if (result) {
						uni.openSetting({})
					}
				}
			},
			// marker tap事件处理函数
			onMarkerTap(e) {
				const markerId = e.detail.markerId;
				const marker = this.markers.find(marker => marker.id === markerId);
				wx.openLocation({
					latitude: marker.latitude,
					longitude: marker.longitude,
					name: marker.title,
					address: marker.address
				})
			},
			searchParing() {
				this.showMarkers = true,
					uni.$showT('已显示附近停车点')
			},
			gotoMyPage() {
				if (this.oppenId) {
					uni.navigateTo({
						url: "/pages/person/person"
					})
				} else {
					uni.navigateTo({
						url: "/pages/login/login"
					})
				}
			},
			getTime() {
				var date = new Date();
				var hours = date.getHours();
				var minutes = date.getMinutes();
				var seconds = date.getSeconds();
				if (hours < 10) hours = "0" + hours;
				if (minutes < 10) minutes = "0" + minutes;
				if (seconds < 10) seconds = "0" + seconds;
				return hours + ":" + minutes + ":" + seconds;
			},
			async btnScan() {
				const res = await uni.$post('/servlet06', {
					oppenId: uni.$getS('oppenId'),
					name: 'curr'
				})
				let that = this;
				if (!this.oppenId) {
					uni.$showT('请先登录')
				} else if (res.number) { //结算之后清除密钥
					uni.showToast({
						title: '请勿重复操作',
						icon: 'none'
					})
				} else {
					const [err, res] = await uni.scanCode().catch(err => err)
					const plateNumberRegex = /^[\u4e00-\u9fa5]{1}[A-Z]{1}\·[A-Z_0-9]{5}$/;
					if (err || res.errMsg !== 'scanCode:ok') return uni.$showT('扫描失败')
					else if(!plateNumberRegex.test(res.result)) return uni.$showT('此二维码无效')
					else {
						that.updateCarId(res.result)
						setTimeout(function() {
							that.loading = true,
								wx.showLoading({
									title: '正在停车...',
								})
						}, 2000)
						const data = await uni.$post('/servlet03', {
							oppenId: that.oppenId,
							carId: uni.$getS('carId')
						})
						if (data != null) {
							setTimeout(function() {
								wx.hideLoading()
								that.loading = false
							}, 5000)
							that.updateBeginTime(that.getTime())
							const timestamp = Date.now();
							uni.setStorageSync('beginTime2',timestamp)
							clearInterval(that.timerID);
							that.timerID = setInterval(() => {
								that.updateParkedTime(1)
							}, 1000);
							if (!data.flag) console.log("服务器异常响应")
							that.updateCarKey(data.secretKey)
						} else {
							console.log("请求失败")
						}
					}
				}
			},
			clickLocation() {
				this.scale = '16'
				uni.createMapContext("map", this).moveToLocation({
					//将地图中心转移到当前位置
					latitude: this.latitude,
					longitude: this.longitude
				})
			},
			async getCar() {
				let that = this;
				this.isGreen1 = true;
				this.isGreen2 = false;
				const res = await uni.$post('/servlet06', {
					oppenId: uni.$getS('oppenId'),
					name: 'curr'
				})
				this.isGet=false
				if (!res.number && uni.$getS('carKey')) {
					this.isGet=true
					uni.$setS('carKey','')
					this.updateCarKey('')
				}
				if (!this.oppenId) {
					uni.$showT('请先登录')
				}
				else if (!that.key&&!this.isGet) {
					uni.$showT('未检测到订单,或车辆已被取走')
				} else if (that.key) {
					let result = await uni.$showM('取车提示', '是否确认取车', '再停一会', '现在就取', '#12B876', '#999')
					if (result) {
						const data = await uni.$post('/servlet06', {
							oppenId: this.oppenId,
							name:'curr'
						})
						if(data.number)
						uni.navigateTo({
							url: '../../pages/pay/pay?secret='+that.key
						})
						else {
							uni.$showT('取车失败', 'error')
						}
					}
				}
			},
			helpGetCar() {
				let that = this;
				this.isGreen1 = true;
				this.isGreen2 = false;
				if (!this.oppenId) {
					uni.$showT('请先登录')
				} else {
					uni.showModal({
						title: '请输入代取密钥',
						cancelText: '取消',
						cancelColor: '#999',
						confirmText: '确定',
						confirmColor: '#12B876',
						editable: true,
						placeholderText: '取车密钥',
						success(res) {
							if (res.confirm) {
								uni.showLoading({
									title:'正在校验密钥'
								})
								uni.request({
									url: 'https://www.usparkinglot.xyz:8443/parklot/servlet06',
									method: 'POST',
									data: {
										name:'secret',
										secretKey:res.content
									},
									success(e) {
										if (e.data.number) {
												that.updateCarKey(res.content)
												uni.navigateTo({
													url: '/pages/pay/pay?secret='+res.content
												})
										}
									},
									fail() {
										console.log("取车请求失败")
									},
									complete(e) {
										if(!e.data.number)
										console.log(e)
										uni.hideLoading()
										uni.$showT('未检测到该订单或密钥有误')
										
									}
								})
							} else {
								console.log("您已取消取车!")
							}
						}
					})
				}

			}
		}
	}
</script>

<style lang="scss">
	#map {
		display: block;
		position: fixed;
		height: 68vh;
		width: 100vw;
		margin: 0;
		padding: 0;
		z-index: -1;
	}

	#map .my-photo {
		float: left;
		height: 60rpx;
		width: 60rpx;
		background-color: #ffffff;
		border-radius: 50%;
		text-align: center;
		box-shadow: 0rpx 6rpx 12rpx rgba(0, 0, 0, 0.5);
		margin: 100rpx 0 0 20rpx;
	}

	#map .location-box {
		width: 66rpx;
		height: 66rpx;
		position: fixed;
		background-color: #ffffff;
		border-radius: 50%;
		bottom: 40vh;
		text-align: center;
		box-shadow: 0rpx 6rpx 12rpx rgba(0, 0, 0, 0.3);
		margin-left: 36rpx;

		.circle {
			width: 45rpx;
			height: 45rpx;
			padding: 11rpx;
		}
	}

	#map .service-box {
		height: 66rpx;
		width: 66rpx;
		position: fixed;
		bottom: 40vh;
		margin-left: 661rpx;
		background-color: #ffffff;
		border-radius: 50%;
		text-align: center;
		box-shadow: 0rpx 6rpx 12rpx rgba(0, 0, 0, 0.3);
		border: 1rpx solid #FF623E;

		.service {
			width: 45rpx;
			height: 45rpx;
			padding: 11rpx;
		}
	}

	#map .search-box {
		width: 66rpx;
		height: 66rpx;
		position: fixed;
		background-color: #ffffff;
		border-radius: 50%;
		bottom: 48vh;
		text-align: center;
		box-shadow: 0rpx 6rpx 12rpx rgba(0, 0, 0, 0.3);
		margin-left: 661rpx;

		.search {
			height: 45rpx;
			width: 45rpx;
			padding: 11rpx;
		}
	}

	.big-box {
		height: 35.5vh;
		width: 100vw;
		border-radius: 20rpx 20rpx 0 0;
		background-color: #334A60;
		padding-top: 20rpx;
		position: fixed;
		bottom: 0rpx;
	}

	.medium-box {
		height: 29.75vh;
		width: 100vw;
		border-radius: 20rpx 20rpx 0 0;
		background-color: #FFFFFF;
		padding-top: 20rpx;
		position: fixed;
		bottom: 0rpx;
	}

	.button1 {
		border-radius: 20rpx;
		float: left;
		height: 120rpx;
		width: 280rpx;
		background-color: #FFFFFF;
		border: 1px solid gray;
		margin-left: 74rpx;
		margin-top: 30rpx;
	}

	.button2 {
		border-radius: 20rpx;
		float: right;
		height: 120rpx;
		width: 280rpx;
		background-color: #FFFFFF;
		border: 1px solid gray;
		margin-right: 74rpx;
		margin-top: 30rpx;
	}

	.green {
		border: 1px solid #04A67E;
	}

	.function-icon {
		margin-top: 100px;
		font-size: 13px;
		color: #999;
		text-align: center;
		display: flex;
		justify-content: center;

		.comopass {
			.comopassIcon {
				width: 42rpx;
				height: 42rpx;
			}
		}

		.active {
			margin: 0 22vw;

			.activeIcon {
				width: 42rpx;
				height: 42rpx;
			}
		}

		.chargeRule {
			.chargeRuleIcon {
				width: 42rpx;
				height: 42rpx;
			}
		}
	}

	#btn-scan {

		// #04A67E
		//扫码取车
		height: 84rpx;
		width: 600rpx;
		background-color: #04A67E;
		border-radius: 42rpx;
		text-align: center;
		line-height: 84rpx;
		margin: 0rpx auto;
		bottom: -50rpx;
	}

	.mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.4);
		z-index: 999;
	}
</style>
<!-- <!-- .......................................................................................................................... -->
