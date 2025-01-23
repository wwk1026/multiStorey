<template>
	<view class="login-container">
		<!-- 遮罩层 -->
		<view class="mask" v-if="loading"></view>
		<uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
		<button type="primary" class="btn-login" @click="clickLogin">一键登录</button>
		<text class="tips-text">登录后尽享更多权益</text>
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
				loading: false
			};
		},
		methods: {
			...mapMutations('m_user', ['updateOppenId', 'updateAvatar', 'updateName']),
			//点击登录...............................................................................
		async clickLogin() {
				let that = this;
				that.loading = true
				uni.showLoading({
						title: '登录中...',
					})
				const [err,res] = await uni.login().catch(err => err)
				if (err || res.errMsg !== 'login:ok') return uni.$showT('登录失败')	
				else{
					let data=await uni.$http.post('/servlet02',{code:res.code})
					if (!data.flag) {
						console.log("服务器异常响应")
						setTimeout(function() {
							wx.hideLoading()
							uni.showToast({
								title: '登录失败',
								icon: 'error'
							})
							setTimeout(function() {
								uni.reLaunch({
									url: '/pages/home/home'
								})
							}, 1500)
						}, 3000)
					} else {
						that.loading = false
						wx.hideLoading()
						that.updateOppenId(data.oppenId) //将openId存到缓存
						that.updateAvatar(
							"https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0"
						)
						that.updateName(data.name)
						uni.showToast({
							title: '登录成功',
							icon: 'success',
							duration: 2000
						})
						setTimeout(function() {
							uni.reLaunch({
								url: '/pages/home/home'
							})
						}, 1500)
					}
				}	
			},
		}
	}
</script>

<style lang="scss">
	.login-container {
		height: 750rpx;
		// background-color: #f8f8f8;
		margin-top: 100px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.btn-login {
			width: 90%;
			border-radius: 100px;
			margin: 15px 0;
			background-color: #12B876;
		}

		.tips-text {
			font-size: 12px;
			color: #282C35;
		}
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
