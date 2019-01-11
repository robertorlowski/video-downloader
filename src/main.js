import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueYouTubeEmbed from 'vue-youtube-embed'
// Import component
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import VueFlashMessage from 'vue-flash-message';
import 'vue-flash-message/dist/vue-flash-message.min.css';

import prototypes from './common/prototypes'
Vue.use(prototypes)

Vue.use(VueFlashMessage);

Vue.use(VueYouTubeEmbed)     
Vue.use(Loading)     



Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
