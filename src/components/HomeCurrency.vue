<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">Курс валют</span>
        </div>
        <table>
          <thead>
          <tr>
            <th>Валюта</th>
            <th>Курс</th>
            <th>Дата</th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="cur of currencies" :key="cur">
            <td>{{cur}}</td>
            <td>{{ getRate(cur) }}</td>
            <td>{{ new Date() | date('date') }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['currency'],
  data:() => ({
    currencies: ['UAH','PLN', 'USD', "EUR"]
  }),
  methods:{
    getRate(currency){
      for (let item of this.currency){
        if (item.cc === currency.toUpperCase()){
          return item.rate.toFixed(2);
        } else if (currency === "UAH"){
          return '1.00';
        }
      }
    }
  }
}
</script>
