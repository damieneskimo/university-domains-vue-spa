import Vue from 'vue'
import App from './App.vue'

import './assets/index.css';

import Echo from 'laravel-echo';

window.Pusher = require('pusher-js');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: 'key',
    wsHost: 'uni.test',
    wsPort: 6001,
    wssHost: 'uni.test',
    wssPort: 6001,
    cluster: 'mt1',
    enabledTransports: ['ws', 'wss'],
    forceTLS: false,
    disableStats: true,
});

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
