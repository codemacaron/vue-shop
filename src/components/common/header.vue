<template lang="pug">
  header
    h1.logo Vshop
    template(v-if="width < 768")
      div.header-right
        c-nav(:screenWidth="width")
        c-search(:screenWidth="width")
        i.el-icon-shopping-cart-2.i-cart
    template(v-else)
      c-nav(:screenWidth="width")
      div.header-right
        c-search
        i.el-icon-shopping-cart-2.i-cart
</template>

<script>
import CNav from './Nav'
import CSearch from './Search'

export default {
  name: 'CHeader',
  components: {
    CNav,
    CSearch
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
@import '../../sass/partials/mixin';
@import '../../sass/partials/color';

  header {
    padding: 20px 0;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    min-height: 70px;
    .logo {
      font-size: $font-xl;
      font-weight: 700;
      color: $color-point;
    }
    .header-right {
      display: flex;
      align-content: flex-end;
      align-items: center;
      margin-left: auto;
      & > * {
        margin-left: 16px;
        color: $color-light;
      }
      @include mobile {
        flex-direction: row-reverse;
        i.i-search {
          order: 2;
        }
        i.i-cart {
          order: 1;
        }
        .category {
          display: flex;
          align-items: center;
          margin-left: 24px;
          font-size: 15px;
          color: $color-lighter;
          i.i-menu {
            order: -1;
            padding-right: 5px;
            font-size: 21px;
            color: $color-point;
          }
        }
      }
      @include desktop {
        flex-flow: row nowrap;
      }
      .i-search {
        font-size: 18px;
      }
      .i-cart {
        font-size: $font-l;
      }
    }
  }
  // #app .el-input {
  //   border: 1px solid red;
  // }
</style>
