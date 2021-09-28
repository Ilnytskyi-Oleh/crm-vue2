<template>
  <div>
    <div>
      <div class="breadcrumb-wrap">
        <a href="/history" class="breadcrumb">История</a>
        <a class="breadcrumb"> Расход </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card"
          :class="[record.typeClass]"
          >
            <div class="card-content white-text">
              <p>Описание:</p>
              <p>Сумма:</p>
              <p>Категория:</p>
              <small>12.12.12</small>
            </div>
          </div>
        </div>
      </div>
    </div>
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
