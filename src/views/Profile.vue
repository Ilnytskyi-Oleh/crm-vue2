<template>
  <div>
    <div class="page-title">
      <h3>Профиль</h3>
    </div>

    <form class="form">
      <div class="input-field">
        <input id="description" type="text" :value="name"/>
        <label for="description">Имя</label>
        <span class="helper-text invalid">name</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { required} from "vuelidate/lib/validators";
export default {
  name: 'profile',
  computed:{
    name(){
     return  this.$store.getters.info.name;
    }
  },
  watch:{
    name(){
      this.$nextTick(()=>{
        window.M.updateTextFields();
      })
    }
  },
   mounted() {
     window.M.updateTextFields();
  },
  validations: {
    name: {required},
  }
}
</script>
