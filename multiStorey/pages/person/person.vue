<template>
	<view class="personal">
		<template v-if="oppenId">
			<view class="upper">
				<img src="https://www.usparkinglot.xyz:8443/parklot/img/userBgc.jpg" style="z-index: -1;
					position: absolute;
					height: 100%;width: 100%;
					right: 0;border-bottom-right-radius: 10%;
					border-bottom-left-radius: 10%;
					box-shadow: 0px 0px 5px #888;
					" mode="widthFix">
				<view class="profile">
					<image class="head" :src="userData.head" @click="BackHome"></image>
					<view class="name">{{nickName2}}</view>
					<view class="license">{{carId}}</view>
				</view>
			</view>
			<!-- 面板2 -->
			<view class="lower">
				<view class="lower-upper">
					<navigator url="../card/card">
						<view class="list1">
							<img src="../../static/wallet.png" alt="" class="wallet">
							<text class="text1">我的卡包</text>
							<uni-icons type="arrowright" size="15" class="icon1" color="#12B876"></uni-icons>
						</view>
					</navigator>
					<navigator url="../list/list">
						<view class="list1">
							<img src="../../static/list.png" alt="" class="wallet">
							<text class="text1">我的订单</text>
							<uni-icons type="arrowright" size="15" class="icon1" color="#12B876"></uni-icons>
						</view>
					</navigator>
					<navigator url="../key/key">
						<view class="list1">
							<img src="../../static/key.png" alt="" class="wallet">
							<text class="text1">取车密钥</text>
							<uni-icons type="arrowright" size="15" class="icon1" color="#12B876"></uni-icons>
						</view>
					</navigator>
				</view>
				<view class="lower-lower">
					<navigator url="../Us/Us">
						<view class="list1">
							<img src="../../static/us.png" alt="" class="wallet">
							<text class="text1">关于我们</text>
							<uni-icons type="arrowright" size="15" class="icon1" color="#12B876"></uni-icons>
						</view>
					</navigator>
					<navigator url="../privacy/privacy">
						<view class="list1">
							<img src="../../static/privacy.png" alt="" class="wallet">
							<text class="text1">条款隐私</text>
							<uni-icons type="arrowright" size="15" class="icon1" color="#12B876"></uni-icons>
						</view>
					</navigator>
					<navigator url="../headName/headName">
						<view class="list1">
							<img src="../../static/setting.png" alt="" class="wallet">
							<text class="text1" style="margin-right: 26px;">设置</text>
							<uni-icons type="arrowright" size="15" class="icon1" color="#12B876"></uni-icons>
						</view>
					</navigator>
					<view class="list1" @click="exit">
						<img src="../../static/leave.png" alt="" class="wallet">
						<text class="text1">退出登录</text>
						<uni-icons type="arrowright" size="15" class="icon1" color="#12B876"></uni-icons>
					</view>
				</view>
			</view>
		</template>
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
				oppenId: '',
				userData: {
					head: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
					name: '微信用户'
				},
				carId:'未绑定车辆',
				nickName2:''
			};
		},
		computed: {
			// ...mapState('m_carId', ['id']),
			...mapState('m_user', ['avatarUrl', 'nickName'])
		},
		async onShow() {
			const [err,res] = await uni.login().catch(err => err)
			if (err || res.errMsg !== 'login:ok') return uni.$showT('登录失败')
			let data=await uni.$post('/servlet02',{code:res.code})
			this.nickName2=data.name
			uni.getStorage({
				key: 'oppenId',
				success: res => {
					if (res.data) {
						this.oppenId = res.data
					}
				}
			})
			uni.getStorage({
				key: 'avatarUrl',
				success: res => {
					if (res.data) {
						this.userData.head = res.data
					}
				}
			})
			uni.getStorage({
				key: 'nickName',
				success: res => {
					if (res.data) {
						this.userData.name = res.data
					}
				}
			})
			uni.getStorage({
				key: 'carId',
				success: res => {
					if (res.data) {
						this.carId = res.data
					}
				}
			})
		},
		methods: {
			...mapMutations('m_user', ['updateOppenId', 'updateAvatar', 'updateName']),
			onChooseAvatar(e) { //用户点击更换头像，昵称
				this.avatarUrl = e.detail.avatarUrl
			},
			BackHome(){
				uni.navigateTo({
					url:'/pages/home/home'
				})
			},
			exit() {
				uni.setStorage({
					key: "oppenId",
					data: ""
				})
				this.updateOppenId('')
				uni.reLaunch({
					url: "/pages/home/home"
				})

			}
		}
	}
</script>
<style lang="scss">
	.personal{
		width: 100%;
		overflow-x: hidden;
		overflow-y: hidden;
	}
	.upper {
		height: 25vh;
		// background-color: #12B876;
		.profile {
			display: inline-block;
			float: left;
			margin-left: 50rpx;
			margin-top: 100px;
			width: 100%;
			height: 85px;
			color: white;

			.head {
				float: left;
				border-radius: 50%;
				width: 85px;
				height: 85px;
				box-shadow: 0px 0px 5px #888;
			}

			.name {
				margin-left: 100px;
				margin-top: 30rpx;
			}

			.license {
				margin-left: 100px;
				margin-top: 10rpx;
			}
		}
	}

	.lower {
		line-height: 45rpx;
		background-color: #F3F3F3;

		.lower-upper {
			box-shadow: 0px 0px 5px #888;
			width: 97%;
			height: 97%;
			background-color: #FFFFFF;
			margin: 67px 5.850px 0px 5.850px;
			border-radius: 6%;
		}

		.lower-lower {
			box-shadow: 0px 0px 5px #888;
			width: 97%;
			height: 97%;
			background-color: #FFFFFF;
			margin: 30rpx auto;
			//border: 1px solid #12B876;
			border-radius: 6%;
		}

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
		}

		.icon1 {
			padding-top: 35rpx;
			padding-left: 486rpx;
		}
	}
</style>
