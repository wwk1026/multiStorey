
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
//导入网络请求的包
import{$http}from '@escook/request-miniprogram'
uni.$http=$http
//使用请求拦截器展示loading效果
$http.beforeRequest=function(options){
	uni.showLoading({
		title:'数据加载中'
	})
}
//使用响应请求拦截器隐藏loading效果
$http.afterRequest=function(){
	uni.hideLoading()
}


//导入store的实例
import store from '@/store/store.js' 

uni.$post=function (url,data) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: 'https://www.usparkinglot.xyz:8443/parklot'+url,
      method: 'POST',
      data: data,
      success: (res) => {
        resolve(res.data);
      },
      fail: (err) => {
        reject(err);
      }
    })
  });
}

uni.$getS = function(key) {
  try {
    const res = uni.getStorageSync(key)
    return res || null
  } catch (err) {
    console.error(err)
    return null
  }
}
uni.$setS=function(key,data){
	uni.setStorage({
		key:key,
		data:data
	})
}
//封装弹窗的方法
uni.$showMsg=function(title='数据请求失败',duration=1500){
	uni.showToast({
		title,
		duration:1500,
		image:'../../static/refuse1.png'
	})	
}

uni.$showT=function(title='提示',icon='none'){
	uni.showToast({
		title,
		icon
	})
}
// 定义带有返回值的函数 uni.$showM
 uni.$showM = function (title, content, cancelText, confirmText,cancelColor,confirmColor) {
  // 返回一个 Promise 对象
  return new Promise((resolve, reject) => {
    uni.showModal({
      title: title || '提示',
      content: content || '是否确认修改信息',
      cancelText: cancelText || '否',
      cancelColor: cancelColor||'#999',
      confirmText: confirmText||'是',
      confirmColor: confirmColor || '#12B876',
      success(res) {
        // 如果用户点击了确认按钮，则将 true 传递给 resolve 函数
        if (res.confirm) {
			console.log("确认")
          resolve(true);
        } else if (res.cancel) {
			console.log("取消")
          resolve(false);
        }
      },
      // 监听失败回调函数
      fail(err) {
        // 将错误对象传递给 reject 函数
        reject(err);
      }
    });
  });
};

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store//挂载store的实例对象
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif