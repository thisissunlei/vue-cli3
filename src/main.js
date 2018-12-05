import '@babel/polyfill';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import http from 'plugins/http/index';
import filters from 'plugins/filters';

import { Notice, Message } from "iview"
import 'iview/dist/styles/iview.css';

// Vue.use(iView);

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});
Vue.config.productionTip = false;

Vue.prototype.$baseUrl = process.env.BASE_URL;
Vue.prototype.$http = http;
Vue.prototype.$Notice = Notice;
Vue.prototype.$Message = Message;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
