import Vue from 'vue'
import App from './App.vue'

import './assets/index.css';

// define timeouts globally, so can access it in all components
Vue.prototype.$timeouts = []

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
