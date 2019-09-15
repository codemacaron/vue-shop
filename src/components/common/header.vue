<template lang="pug">
  header
    h1.logo Vmarket
    template(v-if="width < 768")
      div.header-right
        i.fa.fa-bars
        i.fa.fa-search
        i.el-icon-shopping-cart-2.i-cart
    template(v-else)
      c-nav.nav-container
      div.header-right
        el-input.input-search(placeholder="검색해보세요." v-model="input")
        i.el-icon-shopping-cart-2.i-cart
</template>

<script>
import CNav from './Nav'

export default {
  name: 'CHeader',
  components: {
    CNav
  },
  data () {
    return {
      input: '',
      width: 0
    }
  },
  methods: {
    screenWidth: function () {
      window.addEventListener('resize', () => {
        this.width = window.innerWidth
        console.log('ee', this.width)
      })
    }
  },
  created () {
    this.screenWidth()
  },
  destroyed () {
    this.screenWidth()
  },
  mounted () {
    this.width = window.innerWidth
  }
}
</script>

<style lang="scss" scoped>
@import '../../sass/partials/fonts';
  header {
    padding: 20px 0;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    .logo {
      font-size: $font-xl;
      font-weight: 700;
    }
    .nav-container {
      margin-left: 40px;
    }
    .header-right {
      display: flex;
      flex-flow: row nowrap;
      align-content: flex-end;
      align-items: center;
      margin-left: auto;
      .i-cart {
        margin-left: 16px;
        font-size: $font-l;
      }
    }
  }
  // #app .el-input {
  //   border: 1px solid red;
  // }
</style>
