<template>
  <div>
    <div class="page-title">
      <h3>{{'ProfileTitle' | localize}}</h3>
    </div>

    <Loader v-if="(name == null)" />

    <form class="form" @submit.prevent="submitHandler" v-else>
      <div class="input-field">
        <input id="description" type="text"
               ref="newname"
               v-model="name"
               :class="{invalid: ($v.name.$dirty && !$v.name.required) || ($v.name.$dirty && !$v.name.minLength)}"
        />
        <label for="description">{{ 'Name' | localize }}</label>
        <span
          v-if="$v.name.$dirty &&  !$v.name.minLength"
          class="helper-text invalid">{{'NameIsSmall' | localize}}</span>
        <span
          v-else-if="$v.name.$dirty &&  !$v.name.required"
          class="helper-text invalid">{{'TypeName' | localize}}</span>
      </div>
      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRuLocale">
          <span class="lever"></span>
          Русский
        </label>
      </div>
      <button class="btn waves-effect waves-light" type="submit">
        {{ "Update" | localize }}
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
import localizeFilter from "@/filters/localize.filter";

export default {
  name: 'profile',
  data:()=>({
    name:null,
    isRuLocale: true
  }),
  computed: {
   ...mapGetters(['info'])
  },
  watch:{
    info(){
      this.name = this.info.name
      this.isRuLocale = this.info.locale === 'ru-RU'
      this.$nextTick(()=>{
        window.M.updateTextFields();
      })
    }
  },
  async mounted() {
     this.name = this.info.name
    this.isRuLocale = this.info.locale === 'ru-RU'
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


      try {
        await this.$store.dispatch('updateInfo', {
          name: this.name,
          locale: this.isRuLocale ? 'ru-RU' : 'en-US'
        });
        this.$message(localizeFilter("InfoUpdated"))
      } catch (e) {
        //обработка ошибок
      }

    }
  },
  validations: {
    name: {required, minLength: minLength(4)},
  }
}
</script>
