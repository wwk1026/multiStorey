const state={
	id:'未绑定',
	key:''
	// 赣B*2B666
}

const mutations={
	updateCarKey(state, key) {
	    state.key = key;
		this.commit('m_carId/saveKeyToStorage')
	  },
	saveKeyToStorage(state){
		uni.setStorageSync('carKey',state.key)
	},
	updateCarId(state, newId) {
	    state.id = newId;
		this.commit('m_carId/saveIdToStorage')
	  },
	saveIdToStorage(state){
		uni.setStorageSync('carId',state.id)
	}
}

const actions={
	
}
const getters={
	
}
export default{
	namespaced:true,
	state,
	mutations,
	actions,
	getters
}

