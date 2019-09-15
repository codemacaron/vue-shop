<template lang="pug">
  .getBabyList
    strong(v-for="(list, index) in getBabyList")
      span(v-show="list.value" :class="{active : getLastValue === index}") {{ list.text }}
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'C-Listcomponent',
  computed: {
    ...mapGetters([
      'getBabyList',
      'getLastValue'
    ])
  },
  created () {
    this.$store.dispatch('setValueLastIndex')
  }
}
</script>

<style lang="scss">
.getBabyList{
  display: inline-block;
}
</style>
