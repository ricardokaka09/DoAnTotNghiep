/* eslint-disable prettier/prettier */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import CoreuiVue from '@coreui/vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'
import Toaster from 'v-toaster'
import 'v-toaster/dist/v-toaster.css'
import { ModelSelect } from 'vue-search-select'
import { freeSet } from '@coreui/icons'
import Multiselect from "vue-multiselect";
import VueLoading from 'vuejs-loading-plugin'
import JsonCSV from 'vue-json-csv'

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('multiselect', Multiselect)
Vue.component('font-awesome-layers', FontAwesomeLayers)
Vue.component('model-select', ModelSelect)
Vue.component('font-awesome-layers-text', FontAwesomeLayersText)
Vue.component('downloadCsv', JsonCSV)

library.add(fab)
library.add(fas)
 
Vue.config.productionTip = false;
Vue.use(CoreuiVue)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Toaster, {timeout: 5000})
Vue.use(VueLoading)

new Vue({
  router,
  store,
  icons: freeSet,
  render: (h) => h(App),
}).$mount("#app");
