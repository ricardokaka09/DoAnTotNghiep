import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import CoreuiVue from "@coreui/vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import Toaster from "v-toaster";
import "v-toaster/dist/v-toaster.css";
import { ModelSelect } from "vue-search-select";
import { freeSet } from "@coreui/icons";
import Multiselect from "vue-multiselect";

Vue.component("multiselect", Multiselect);
Vue.component("model-select", ModelSelect);

library.add(fab);
library.add(fas);

Vue.config.productionTip = false;
Vue.use(CoreuiVue);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Toaster, { timeout: 5000 });

new Vue({
  router,
  store,
  icons: freeSet,
  render: (h) => h(App),
}).$mount("#app");
