<template>
  <div>
    <Loader  v-if="!Object.keys(this.$store.getters.info).length" />
    <div class="app-main-layout" v-else>

      <Navbar @click="isOpen = !isOpen" />

      <Sidebar :isOpen="isOpen"/>

      <main class="app-content" :class="{full: !isOpen}">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large blue" to = "/record" v-tooltip="{value: newRecord, position: 'top'}">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>


<script>
import Navbar from "@/components/app/Navbar";
import Sidebar from "@/components/app/Sidebar";
import messages from "@/utils/messages";
import localizeFilter from "@/filters/localize.filter";


export default {
  name: "main-layout",
  data: () =>({
    isOpen: true,
  }),
  async mounted() {
    if(!Object.keys(this.$store.getters.info).length){  // Obj.keys(obj) возвращает масив ключей
      //Запрос данных пользователя
      await this.$store.dispatch('fetchInfo');

    }

  },
  components: {
    Navbar,
    Sidebar,
  },
  //отлавливаем state из Vuex.Store для обработки ошибок
  computed: {
    error() {
      return this.$store.getters.error
    },
    newRecord(){
      return localizeFilter("NewRecord")
    }
  },
  watch:{
    // отслеживание измениений в computed.error()
    error(fireBaseError){
      console.log(fireBaseError.code);
      this.$error(messages[fireBaseError.code] || 'Что-то пошло не так');
    }
  }
};
</script>
