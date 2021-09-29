import _ from 'lodash';

export default {
  data(){
    return {
      page: +this.$route.query.page || 1,
      pageSize: 2,
      pageCount: 0,
      allItems: [],  // все данные с сервера
      items: [],     // Данные которые надо показывать.
    }
  },
  methods: {
    pageChangeHandler(page) {
      this.$router.push(`${this.$route.path}?page=${page}`);
      this.items = this.allItems[page - 1] || this.allItems[0];
      this.page = page;


    },
    setupPagination(allItems){
      this.allItems = _.chunk(allItems, this.pageSize); //рабиваем все элементы на массив масивов pageSize длинной
      this.pageCount = _.size(this.allItems); // количество страниц
      this.items = this.allItems[this.page - 1] || this.allItems[0];
    }
  }
}
