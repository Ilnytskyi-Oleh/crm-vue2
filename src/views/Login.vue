<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{"HomeBookkeeping" | localize}}</span>
      <div class="input-field">
        <input id="email" type="text"
               v-model.trim="email"
               :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
        />
        <label for="email">Email</label>
        <small
          v-if="$v.email.$dirty && !$v.email.required"
          class="helper-text invalid">Поле Email не может быть пустым</small>
        <small
          v-else-if="$v.email.$dirty && !$v.email.email"
          class="helper-text invalid">Некорректный Email</small>
      </div>
      <div class="input-field">
        <input id="password" type="password"
               v-model.trim="password"
               :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.email.$dirty && !$v.password.minLength)}"
        />
        <label for="password">{{"Password" | localize(passwordMinLength)}}</label>
        <small
          v-if="$v.password.$dirty && !$v.password.required"
          class="helper-text invalid">{{ "PasswordCannotBeEmpty" | localize }}</small>
        <small
          v-else-if="$v.password.$dirty && !$v.password.minLength"
          class="helper-text invalid">{{"PasswordCannotBeLess" | localize(passwordMinLength)}}</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          {{"LogIn" | localize}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{"NoAcc" | localize}}
        <router-link to="/register" >{{"SingUp" | localize}}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
//непосредственно импорт валидаторов с библиотеки
import {email, required, minLength} from 'vuelidate/lib/validators';

//импорт словаря сообщений для всплвающего уведомления
import messages from "@/utils/messages";

const passwordMinLength = 6;
export default {
  name: 'login',
  data: () => ({
    email: '',
    password: '',
    passwordMinLength: passwordMinLength
  }),
  validations:{ // <-- из пакета Vuelidate
    // даем те же имена моделям, что и в data и применяем правила валидации в параметрах
    email: {email, required},
    password: {required, minLength: minLength(passwordMinLength)}
  },
  mounted() {
    //инициализация всплывающего сообщения
    if (messages[this.$route.query.message]){
      this.$message(messages[this.$route.query.message]);
    }
  },
  methods: {
    async submitHandler(){
      if(this.$v.$invalid){
        this.$v.$touch(); // активация валидации
        return;
      }

      const formData = {
        email: this.email,
        password: this.password
      }

      try{
        await this.$store.dispatch('login', formData);
        this.$router.push('/');
      } catch (e) {
        // console.log(e);
      }
    }
  }
}

</script>
