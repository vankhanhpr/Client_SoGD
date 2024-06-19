// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vue-search-select/dist/VueSearchSelect.css'
// toast notification
import toastPlugin from "./plugins/toastPlugin";
import 'bootstrap'
// axios
import VueAxios from "vue-axios"
import axiosPlugin from "./plugins/axiosPlugin"
import token from "./plugins/getToken"
import bootbox from "bootbox";
import {store} from './store'
import moment from 'moment';
import KTable2 from '@/common/KTable_V2.vue';
// js
import 'jquery'
const jquery = require('jquery')
Vue.use(BootstrapVue)
Vue.use(VueAxios, axiosPlugin)
Vue.use(toastPlugin)
Vue.config.productionTip = false;
Vue.use(bootbox);
// Vue.use(moment);
Vue.component('k-table',KTable2); 
// Vue.component('carousel', OwlCarousel)
// loading
Vue.prototype.loading = function (type) {
  if (type) {
    jquery(".overlay-common").addClass("show")
  } else {
    jquery(".overlay-common").removeClass("show")
  }
};

Vue.prototype.$token = token;
Vue.prototype.$box = bootbox;
Vue.prototype.$ = jquery;
Vue.prototype.$moment = moment;


router.afterEach((to, from) => {
    // Use next tick to handle router history correctly
    // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
    Vue.nextTick(() => {
        document.title = to.meta.title;
    });
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  methods: {
    toastSuccess: function (arg) {
      this.$toast.success(arg);
    },
    toastError: function (arg) {
      this.$toast.error(arg);
    },
    toastWarning: function (arg) {
      this.$toast.warning(arg);
    },
    toastInfo: function (arg) {
      this.$toast.info(arg);
    }
  }
})
