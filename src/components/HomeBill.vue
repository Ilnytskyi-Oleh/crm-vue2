<template>
  <div>

  <div class="col s12 m6 l4" >
    <div class="card light-blue bill-card" >
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>
        <p
          v-for="cur in currencies"
          :key = "cur"
          class="currency-line">
          <span>{{getCurrency(cur) | currency(cur)}}</span>
        </p>
      </div>

    </div>
  </div>
  </div>
</template>

<script>
export default {
  props: ['currency'],
  data: () => ({
    currencies: ['UAH','PLN', 'USD', "EUR"],
    loading: true
  }),
  computed:{
    base(){
      return this.$store.getters.info.bill;
    },
  },
  mounted() {

  },
  beforeUpdate() {

  },
  methods:{
    getCurrency(currency){
      for (let item of this.currency){
        if (item.cc === currency.toUpperCase()){

          return Math.floor(this.base / item.rate);

        } else if (currency === "UAH"){
          return this.base;
        }
      }
    }
  }
}
</script>
