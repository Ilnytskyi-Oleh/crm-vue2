import Vue from 'vue'
import Vuelidate from "vuelidate";

import App from './App.vue';
import router from './router';
import store from './store';
import dateFilter from '@/filters/date.filter';
import messagePlugin from '@/utils/message.plugin';
import './registerServiceWorker';
import 'materialize-css/dist/js/materialize.min';

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBStCR00m-JtGkfjdk74Iz5evuTnBwD81s",
  authDomain: "vue-cms-beetroot.firebaseapp.com",
  projectId: "vue-cms-beetroot",
  storageBucket: "vue-cms-beetroot.appspot.com",
  messagingSenderId: "1043548847265",
  appId: "1:1043548847265:web:a0c07b481ec7704c3944e0",
  measurementId: "G-DGFHLVM35H"
};



Vue.config.productionTip = false;
Vue.use(messagePlugin);                       // Кастомный плагин для всплвающих сообщений.
Vue.use(Vuelidate);                           // Валидация форм

// Форматирование даты в нужный вид ( в Vue 3 это работает по другому!!!)
Vue.filter('date', dateFilter);

 initializeApp(firebaseConfig);

let app;

//вызвается если Firebase либо находит локальные данные пользователя либо нет
getAuth().onAuthStateChanged(() => {
  if(!app){
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }

})



