<template>
  <div class="grey darken-1 empty-layout">
    <router-view/>
  </div>
</template>

<script>
import messages from "@/utils/messages"; // импорт словаря сообщений


export default {
  //отлавливаем state из Vuex.Store для обработки ошибок
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  watch:{
    // отслеживание измениений в computed.error()
    error(fireBaseError){
      console.log(fireBaseError.code);
      this.$error(messages[fireBaseError.code] || 'Что-то пошло не так');
    }
  }
}

</script>
