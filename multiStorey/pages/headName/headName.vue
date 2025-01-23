<template>
	<view>
		<view class="">
			
		<button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
			<image class="avatar" :src="temp.head"></image>
		</button>
		<view style="text-align: center;">
			{{nickName}}
		</view>
		</view>
		<view class="number">
			<text style="float: left;margin-right: 50px;margin-left: 30px;">电话:</text>
			<input class="uni-input" @input="onKeyInput2"  placeholder="请输入电话号码" />
		</view>
		<view class="nickName">
			<text style="float: left;margin-right: 50px;margin-left: 30px;">昵称:</text>
			<input class="uni-input" @input="onKeyInput" type="nickname" placeholder="请输入昵称" />
		</view>

		<button type="" class="btn-login" @click="submit">提交</button>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				oppenId: '',
				loding: false,
				temp: {
					head: '',
					name: ''
				},
				nickName:'',
				number:''
			}
		},
		computed: {
			// ...mapState('m_user', ['avatarUrl','oppenId'])
		},
		async onShow() {
			const [err,res] = await uni.login().catch(err => err)
			if (err || res.errMsg !== 'login:ok') return uni.$showT('登录失败')
			let data=await uni.$http.post('/servlet02',{code:res.code})
			this.nickName=data.name
			
			let that = this
			uni.getStorage({
				key: 'avatarUrl',
				success: res => {
					if (res.data) {
						that.updateAvatar(res.data)
						this.temp.head = res.data
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
			...mapMutations('m_user', ['updateAvatar', 'updateName']),
			...mapGetters('m_user', ['getAvatarUrl']),
			onChooseAvatar(res) {
				this.temp.head = res.detail.avatarUrl
			},
			onKeyInput(e) {
				this.temp.name = e.detail.value
			},
			onKeyInput2(e){
				this.number = e.detail.value
			},
			async submit(e) {
				let that = this
				try {
					let result=await uni.$showM()
					if (result) {
						const phoneRegex = /^1[0-9]{10}$/;
						if(phoneRegex.test(this.number)){
						that.updateAvatar(that.temp.head);
						that.updateName(that.temp.name);
						await uni.$http.post('/servlet04', {
							oppenId: that.oppenId,
							name: that.temp.name,
							number: this.number
						});
						uni.navigateBack({
							data: 1
						})
						}else{
							uni.$showT('手机号有误，请重新输入')
						}
					} else {
						console.log('取消修改');
					}
				} catch (err) {
					console.log(err);
				}
			}

		}
	}
</script>

<style>
	.number{
		margin: 30px;
	}
	.nickName{
		margin: 30px;
	}
	.avatar-wrapper {
		padding: 0;
		width: 56px !important;
		border-radius: 8px;
		margin-top: 40px;
		margin-bottom: 40px;
	}

	.avatar {
		display: block;
		width: 56px;
		height: 56px;
	}

	.btn-login {
		width: 60%;
		border-radius: 100px;
		margin: 30px auto;
		color: #FFFFFF;
		background-color: #12B876;
	}
</style>
