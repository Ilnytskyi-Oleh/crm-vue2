//Плагин для Vu JS

export default {

  //даный метод вызывает Vuе JS, что-бы применить этот плагин
  install(Vue, options) {
    // добавление нового приватного поля (свойства) $message в Vue
    Vue.prototype.$message = function (html) {
      window.M.toast({html})
    }

    Vue.prototype.$error = function (html) {
      window.M.toast({html: `[Ошибка] ${html}`})
    }


    console.log(options); //Костыль для линта
  }
}
