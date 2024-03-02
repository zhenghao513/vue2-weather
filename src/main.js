import Vue from "vue";
import App from "./App.vue";
import "./assets/css/main.css";
import { Row, Col, Button } from "element-ui";
import "qweather-icons/font/qweather-icons.css";
import axios from "axios";

axios.defaults.baseURL = "https://devapi.qweather.com";

Vue.config.productionTip = false;

Vue.use(Row);
Vue.use(Col);
Vue.use(Button);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
