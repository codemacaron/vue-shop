<template lang="pug">
  p.loading(v-show="getLoading === true && getStopList !== false")
    span.hop
      span L
      span o
      span a
      span d
      span i
      span n
      span g
      span .
      span .
      span .
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'C-Loading',
  computed: {
    ...mapGetters([
      'getStopList',
      'getLoading'
    ])
  }
}

</script>

<style lang="scss" scoped>
@import "./../../sass/partials/_fonts";
@import "./../../sass/partials/_color";
@import "./../../sass/partials/_mixin";

.loading {
  text-align: center;
  .hop {
    text-transform: uppercase;
    color: #34495e;
    span {
      display: inline-block;
      animation: loading 4s ease-in-out 0.6s infinite;
      margin-left: 5px;
      &:nth-child(1) {
        margin-left: 0px;
        animation-delay: 0.1s;
      }
      &:nth-child(2) {
        animation-delay: 0.2s;
      }
      &:nth-child(3) {
        animation-delay: 0.3s;
      }
      &:nth-child(4) {
        animation-delay: 0.4s;
      }
      &:nth-child(5) {
        animation-delay: 0.5s;
      }
      &:nth-child(6) {
        animation-delay: 0.6s;
      }
      &:nth-child(7) {
        animation-delay: 0.7s;
      }
    }
  }
}
</style>
