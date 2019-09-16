<template lang="pug">
  div
    h1.shop-title 채소 품목
    c-list
</template>

<script>
import CList from '../../components/List'

export default {
  name: 'Fruits',
  components: {
    CList
  }
}
</script>

<style lang="scss">
  .shop-title {
    font-size: 22px;
    font-weight: 700;
  }
</style>
