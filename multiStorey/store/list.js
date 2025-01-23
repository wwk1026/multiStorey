export default {
	//开启命名空间
	namespaced: true,
	//数据
	state: () => ({
		money: null,
		beginTime: '',
		parkedTime: 0,
		endTime: '',
		beginTime2: 0,
		endTime2: 0,
		discount:null,
		id:null
	}),
	//方法节点
	mutations: {
		updateId(state, id) {
			state.id = id
		},
		updateDiscount(state, dis) {
			state.discount = dis
		},
		updateMoney(state, money) {
			state.money = money
			this.commit('m_time/saveMoneyToStorage')
		},
		saveMoneyToStorage(state) {
			const timestamp = Date.now();
			uni.setStorageSync('money', state.money)
		},
		updateBeginTime(state, time) {
			state.beginTime = time
			this.commit('m_time/saveBeginTimeToStorage')
		},
		saveBeginTimeToStorage(state) {
			uni.setStorageSync('beginTime', state.beginTime)
		},
		updateParkedTime(state, time) {
			state.parkedTime += time
			this.commit('m_time/saveParkedTimeToStorage')
		},
		saveParkedTimeToStorage(state) {
			uni.setStorageSync('parkedTime', state.parkedTime)
		},
		updateEndTime(state, time) {
			state.endTime = time
			this.commit('m_time/saveEndTimeToStorage')
		},
		saveEndTimeToStorage(state) {
			const timestamp = Date.now();
			uni.setStorageSync('endTime2',timestamp)
			uni.setStorageSync('endTime', state.endTime)
		},
	},
	getters: {
	}

}
