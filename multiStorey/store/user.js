export default{
	//开启命名空间
	namespaced:true,
	//数据
	state :()=>({
		// address:{},
		token:'',
		oppenId:'',
		//用户头像
		avatarUrl: '',
		//用户昵称
		nickName:'',
		//是否领取优惠券
		isGet:false,
		isGet2:false,
		//用户的信息对象		
		userinfo:JSON.parse(uni.getStorageSync('userinfo')||'{}')		
	}),
	//方法节点
	mutations:{
		updateIsGet(state,isGet){
			state.isGet=isGet
			this.commit('m_user/saveIsGetToStorage')
		},
		saveIsGetToStorage(state){
			uni.setStorageSync('isGet',state.isGet)
		},
		updateIsGet2(state,isGet2){
			state.isGet2=isGet2
			this.commit('m_user/saveIsGet2ToStorage')
		},
		saveIsGet2ToStorage(state){
			uni.setStorageSync('isGet2',state.isGet)
		},
		updateOppenId(state,id){
			state.oppenId=id
			this.commit('m_user/saveOppenIdToStorage')
		},
		saveOppenIdToStorage(state){
			uni.setStorageSync('oppenId',state.oppenId)
		},
		updateAvatar(state,url){
			state.avatarUrl=url
			this.commit('m_user/saveAvatarToStorage')
		},
		updateName(state,name){
			state.nickName=name
			this.commit('m_user/saveNameToStorage')
		},
		saveAvatarToStorage(state){
			uni.setStorageSync('avatarUrl',state.avatarUrl)
		},
		saveNameToStorage(state){
			uni.setStorageSync('nickName',state.nickName)
		},
		
		//更新收货地址
		updataAddress(state,address){
			state.address=address
		},
		//第一个参数一定是state
		updataUserInfo(state,userinfo){
			state.userinfo=userinfo
			//触发saveUserInfoTOStorage方法
			this.commit('m_user/saveUserInfoToStorage')
		},
		//把数据持久化存到本地,缓存
		saveUserInfoToStorage(state){
			uni.setStorageSync('userinfo',JSON.stringify(state.userinfo))
		}
	},
	getters:{
		getAvatarUrl(state){
			return state.avatarUrl;
		}		
	}
	
}