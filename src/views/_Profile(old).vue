<template>
  <div>
    <div class="page-title">
      <h3>Профиль</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input id="description" type="text"
               ref="newname"
               v-model="newname"
               :class="{invalid: ($v.newname.$dirty && !$v.newname.required) || ($v.newname.$dirty && !$v.newname.minLength)}"
        />
        <label for="description">Имя</label>
        <span
          v-if="$v.newname.$dirty &&  !$v.newname.minLength"
          class="helper-text invalid">Поле Имя не может быть меньше 4 символов</span>
        <span
          v-else-if="$v.newname.$dirty &&  !$v.newname.required"
          class="helper-text invalid">Поле Имя не может быть пустым</span>
      </div>
      <div class="switch">
        <label>
          Инглиш
          <input type="checkbox">
          <span class="lever"></span>
          Russian
        </label>
      </div>
      <button class="btn waves-effect waves-light" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<style scoped>
.switch{
  margin-bottom: 2rem;
}
</style>

<script>
import { required, minLength} from "vuelidate/lib/validators";
import {mapGetters} from "vuex";

export default {
  name: 'profile',
  data(){
    return{
      newname: null
    }
  },
  computed: {
    name(){
      return this.$store.getters.info.name;
    }
  },
  watch:{
    name(name){
      this.newname = name
      this.$nextTick(()=>{
        window.M.updateTextFields();
      })
    },
  },
  async mounted() {
    this.newname = this.name
    this.$nextTick(()=>{
      window.M.updateTextFields();
    })
  },
  methods:{
    async submitHandler() {
      if(this.$v.$invalid){
        this.$v.$touch(); // активация валидации
        return;
      }
      let name = this.newname;

      try {
        await this.$store.dispatch('updateInfo', {name}); // отправка данных в Firebase и регистрация
        this.$message('Имя успешно обновлено!')
      } catch (e) {
        //обработка ошибок
      }

    }
  },
  validations: {
    newname: {required, minLength: minLength(4)},
  }
}
</script>
