import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Buefy from "buefy";
import "buefy/dist/buefy.css";

Vue.prototype.$URL = 'http://127.0.0.1:8000/'
Vue.prototype.$prodURL = 'https://p4backend.herokuapp.com/'


Vue.use(Buefy);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
