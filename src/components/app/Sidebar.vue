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
import localizeFilter from "@/filters/localize.filter";

export default {
  props:['isOpen'],
  computed:{
    links(){
      return [
        {title:localizeFilter("Account"), url: '/', exact: true},
        {title:localizeFilter("History"), url: '/history'},
        {title:localizeFilter("Planning"), url: '/planning'},
        {title:localizeFilter("NewRecord"), url: '/record'},
        {title:localizeFilter('Categories'), url: '/categories'},
      ]
    }
  }
}
</script>
