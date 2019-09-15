<template lang="pug">
  header
    h1 헤더
    c-nav
</template>

<script>
import CNav from './Nav'
export default {
  name: 'CHeader',
  components: {CNav}
}
</script>
