<template lang="pug">
  nav
    ul.nav-container
      li.nav-item
        router-link(to="/my") 채소
      li.nav-item 과일
      li.nav-item 소스
</template>

<script>
export default {
  name: 'CNav'
}
</script>

<style lang="sass">
  .nav-container
    display: flex
    flex-flow: row wrap
    & .nav-item
      margin-right: 24px
      list-style: none
</style>
