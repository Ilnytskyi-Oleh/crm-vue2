<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{"HomeBookkeeping" |localize}}</span>
      <div class="input-field">
        <input id="email" type="text"
               v-model.trim="email"
               :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
        />
        <label for="email">Email</label>
        <small
          v-if="$v.email.$dirty && !$v.email.required"
          class="helper-text invalid">{{"EmailCannotBeEmpty" | localize}}</small>
        <small
          v-else-if="$v.email.$dirty && !$v.email.email"
          class="helper-text invalid">{{"InvalidEmail" | localize}}</small>
      </div>
      <div class="input-field">
        <input id="password" type="password"
               v-model.trim="password"
               :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.email.$dirty && !$v.password.minLength)}"
        />
        <label for="password">{{"PasswordCannotBeLess" | localize}}</label>
        <small
          v-if="$v.password.$dirty && !$v.password.required"
          class="helper-text invalid">{{"PasswordCannotBeEmpty" | localize}}</small>
        <small
          v-else-if="$v.password.$dirty && !$v.password.minLength"
          class="helper-text invalid">{{"PasswordCannotBeLess" | localize}}</small>
      </div>
      <div class="input-field">
        <input id="name" type="text"
               v-model.trim="name"
               :class="{invalid: ($v.name.$dirty && !$v.name.required)}"
        />
        <label for="name">{{"Name" | localize}}</label>
        <small
          v-if="$v.name.$dirty && !$v.name.required"
          class="helper-text invalid">{{"NameCannotBeEmpty" | localize}}</small>
      </div>
      <p>
        <label>
          <input  type="checkbox" v-model="agree"/>
          <span>{{"Agree" | localize}}</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit" >
          {{"SingUp" | localize}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
          {{"DoUHaveAcc" | localize}}
        <router-link to="/login">{{"LogIn" | localize}}</router-link>
      </p>
    </div>
  </form>
</template>



<script>

import {email, minLength, required} from "vuelidate/lib/validators";

const passwordMinLength = 6;

export default {
  name: 'register',
  data: () => ({
    email: '',
    password: '',
    name: '',
    agree: false,
    passwordMinLength: passwordMinLength,
  }),
  validations:{ // <-- из пакета Vuelidate
    // даем те же имена моделям, что и в data и применяем правила валидации в параметрах
    email: {email, required},
    password: {required, minLength: minLength(passwordMinLength)},
    name: {required},
    agree:{checked: v => v},
  },
  methods: {
    async submitHandler() {
      if(this.$v.$invalid){
        this.$v.$touch(); // активация валидации
        return;
      }

      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      }

      try {
        await this.$store.dispatch('register', formData); // отправка данных в Firebase и регистрация
        this.$router.push('/'); // Перенаправление на главную при успешной регистрации
      } catch (e) {
       //обработка ошибок
      }

    }
  }
}
</script>
