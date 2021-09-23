import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from "./info";
import category from "./category";
import record from './record';

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
    },
  },
  //геттеры для state.error
  getters: {
    error: state => state.error,
  },
  actions: {
    //Берем курс валют с сайта НБУ
    async fetchCurrency(){
       return await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let fullResults = data.filter((item) =>{
            if(['PLN','USD','EUR'].includes(item.cc))
              return item;
          })
          let results = [];
          for (let item of fullResults){
            results.push({
              rate: item.rate,
              cc:item.cc
            })
          }
          return results
        });
    }
  },
  modules: {
    //модуль регистрации/авторизации/категорий/записей
    auth, info, category, record
  },

})
