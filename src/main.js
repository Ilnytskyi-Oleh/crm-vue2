import Vue from 'vue'
import Vuelidate from "vuelidate";
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import messagePlugin from '@/utils/message.plugin'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

Vue.config.productionTip = false;
Vue.use(messagePlugin);                       // Кастомный плагин для всплвающих сообщений.
Vue.use(Vuelidate);                           // Валидация форм
Vue.filter('date', dateFilter);            // Форматирование даты в нужный вид ( в Vue 3 это работает по другому!!!)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
