<template>
  <div>
    <Loader v-if="loading"/>
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <a href="/history" class="breadcrumb">История</a>
        <a class="breadcrumb"> {{(record.typeClass === 'green') ? 'Доход' : 'Расход'}} </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card"
          :class="[record.typeClass]"
          >
            <div class="card-content white-text">
              <p>Описание: {{record.description}}</p>
              <p>Сумма: {{record.amount | currency()}}</p>
              <p>Категория: {{record.categoryName}}</p>
              <small>{{record.date | date('datetime')}}</small>
            </div>
          </div>
        </div>
      </div>
      <div class="row ">
        <div class="col s2">
          <button class="btn waves-effect waves-light auth-submit" @click.prevent="$router.go(-1)">
            Назад
            <i class="material-icons left">chevron_left</i>
          </button>
        </div>

      </div>
    </div>
    <p class="center" v-else>Такой записи нет</p>
  </div>
</template>

<script>

export default {
  name: 'detail',
  data: () => ({
    record: null,
    loading: true,
  }),
  async mounted(){
    const id =  this.$route.params.id;
    const record = await this.$store.dispatch('fetchRecordById', id);
    const category = await this.$store.dispatch('fetchCategoryById', record.categoryId);

    this.record = {
      ...record,
      categoryName: category.title,
      typeClass: record.type === 'income' ? 'green' : 'red',
    }
    this.loading = false;

  }

}

</script>
