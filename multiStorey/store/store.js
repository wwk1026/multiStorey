import Vue from 'vue'
import Vuex from 'vuex'
import mouduleUser from '@/store/user.js'
import carId from '@/store/carId.js'
 import list from '@/store/list.js'
Vue.use(Vuex)//将Vuex安装为插件
//创建一个store的实例对象
const store =new Vuex.Store({
	modules:{
		//挂载
		'm_user':mouduleUser,//以后访问用户数据或者getters要使用m_user路径去访问
		'm_carId':carId,
		'm_time':list
	}
})

//分享出store
export default store

