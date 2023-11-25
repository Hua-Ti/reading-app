import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vantConfig from './untils/vant-config'

import '../src/style/my-theme.css'


Vue.config.productionTip = false

//这两句要放在new Vue()的前面
Vue.use(VueAxios, axios)
Vue.use(vantConfig)

//监听localStorage的fontExtent(字体大小)值
Vue.prototype.resetSetItem = function (key, newVal) {
  if (key === 'fontExtent') {

    // 创建一个StorageEvent事件
    let newStorageEvent = document.createEvent('StorageEvent');
    const storage = {
      setItem: function (k, val) {
        localStorage.setItem(k, val);

        // 初始化创建的事件
        newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);

        // 派发对象
        window.dispatchEvent(newStorageEvent);
      }
    }
    return storage.setItem(key, newVal);
  }
}
//监听localStorage的contentWords(内容)值
Vue.prototype.resetContentWord = function (key, newVal) {
  if (key === 'contentWords') {

    // 创建一个StorageEvent事件
    let newStorageEvent = document.createEvent('StorageEvent');
    const storage = {
      setItem: function (k, val) {
        localStorage.setItem(k, val);

        // 初始化创建的事件
        newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);

        // 派发对象
        window.dispatchEvent(newStorageEvent);
      }
    }
    return storage.setItem(key, newVal);
  }
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')



