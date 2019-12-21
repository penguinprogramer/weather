import Vue from "vue";
import App from "./App.vue";
// import vuetify from "@/plugins/vuetify"; // path to vuetify export
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import vuetify from "./plugins/vuetify";
Vue.use(Vuetify);

import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

// this part resolve an issue where the markers would not appear
delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: h => h(App)
}).$mount("#app");
