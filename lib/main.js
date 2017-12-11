// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import router from './router';
import axios from 'axios';
import App from './App';
import store from './store/store';
// 引入mint-ui
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';

Vue.config.productionTip = false;

Vue.prototype.$http = axios;

Vue.use(MintUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  router: router,
  template: '<App/>',
  components: { App: App }

});