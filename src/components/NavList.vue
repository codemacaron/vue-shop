<template lang="pug">
  ul.nav-container
    li.nav-item(v-for="item in menu" :key="`menu-${item.category}`" @click="handleClose")
      router-link(:to="`/shop/${item.category}`") {{ item.name }}
</template>

<script>
export default {
  name: 'CNavList',
  props: ['handleClose'],
  data () {
    return {
      menu: [
        {
          category: 'veggies',
          name: '채소'
        },
        {
          category: 'fruits',
          name: '과일'
        },
        {
          category: 'sauces',
          name: '소스'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../sass/partials/mixin';

  .nav-container {
    display: flex;
    flex-flow: row wrap;
    @include mobile {
      flex-flow: column wrap;
      padding-left: 24px;
    }
    .nav-item {
      margin-right: 24px;
      list-style: none;
      @include mobile {
        margin-bottom: 16px;
        font-size: 20px;
      }
    }
  }
</style>
