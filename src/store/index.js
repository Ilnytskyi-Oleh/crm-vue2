import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from "./info";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //Кастомная шина ошибок
    error: null,
  },
  mutations: {
    // Сеттер для state.error
    setError(state, error){
      state.error = error;
    },
    //Очистка ошибок
    clearError(state){
      state.error = null;
    }
  },
  //геттеры для state.error
  getters: {
    error: state => state.error,
  },
  actions: {
    //Берем курс валют с сайта НБУ
    async fetchCurrency(){
      fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let results = data.filter((item) =>{
            if(['PLN','USD','EUR'].includes(item.cc))
              return item;
          })
          console.log(results)
        });
    }
  },
  modules: {
    //модуль регистрации/авторизации
    auth, info
  }
})
