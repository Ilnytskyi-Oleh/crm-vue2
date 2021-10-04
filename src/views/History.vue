<template>
  <div>
    <div class="page-title">
      <h3>{{"RecordsHistory" | localize}}</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!records.length">
      {{"NoRecords" | localize}}
      <router-link to="/record"> {{"Add" | localize}} </router-link>
    </p>

    <section v-else>
      <HistoryTable :records="items"
                    :page="page"
                    :page-size="pageSize"
      />
      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text=backArr
        :next-text=nextArr
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>

<script>
import {Pie} from 'vue-chartjs';
import paginationMixin from '@/mixins/pagination.mixin';
import HistoryTable from "@/components/HistoryTable";
import localizeFilter from "@/filters/localize.filter";

export default {
  name: 'history',
  extends: Pie,
  mixins:[paginationMixin],
  data: () => ({
    loading: true,
    records: [],

  }),
  computed:{
    backArr(){
      return localizeFilter("BackArr");
    },
    nextArr(){
      return localizeFilter("NextArr");
    }
  },
  async mounted(){
    this.records = await this.$store.dispatch('fetchRecords');
    const categories = await this.$store.dispatch('fetchCategories');

    this.setup(categories, this.records); // отрисовка графика и активация пагинации
    this.loading = false;
  },
  methods:{
    setup(categories, records){
      this.renderChart({
        labels:  (records.filter(r=>r.type==='outcome')).map(r=>r.categoryId)
          .filter((v, i, a) => a.indexOf(v) === i)
          .map(id => {
          return categories.find(c=>c.id===id).title
        }),
        datasets: [{
          label: 'Расходы по категориям',
          data: (records.filter(r=>r.type==='outcome'))  //Даже не спрашивай
            .map(r=>r.categoryId)
            .filter((v, i, a) => a.indexOf(v) === i)
            .map(id => {return categories.find(c=>c.id===id)})
            .map(c => {
                return records.reduce((total, r ) =>{
                  if(r.categoryId === c.id && r.type === 'outcome'){
                    total += +r.amount
                  }
                return total;
            }, 0)
          }),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      });
      this.setupPagination(this.records.map(record => {
        return {
          ...record,
          categoryName: categories.find(c => c.id === record.categoryId).title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? 'Доход' : 'Раскод',
        }
      }));
    }
  },
  components: {
    HistoryTable,
  },
}

</script>
