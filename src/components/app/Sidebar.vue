<template>
  <ul class="sidenav app-sidenav" :class="{open: isOpen}">
    <router-link
      v-for="link in links"
      :key="link.url"
      active-class="active"
      custom v-slot="{ navigate }"
      :to="link.url"
      :exact="link.exact"
    >
      <li @click="navigate" @keypress.enter="navigate" role="link">
        <a href="#" class="waves-effect waves-orange pointer">{{link.title}}</a>
      </li>
    </router-link>
  </ul>
</template>


<script>
export default {
  props:['isOpen'],
  data: () => ({
    links:[
      {title:'Счет', url: '/', exact: true},
      {title:'История', url: '/history'},
      {title:'Планирование', url: '/planning'},
      {title:'Новая запись', url: '/record'},
      {title:'Категории', url: '/categories'},
    ]
  })
}
</script>
