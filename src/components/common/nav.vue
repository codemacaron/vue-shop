<template lang="pug">
  div.nav
    template(v-if="screenWidth < 768")
      span.category(@click="trigger=true") 메뉴
        i.el-icon-menu.i-menu
      el-drawer(
        :visible.sync="trigger"
        :direction="'ttb'"
        :title="'VShop'"
      )
        nav
          c-nav-list(:handleClose="handleClose")
        el-button(plain) 로그아웃
    nav(v-else)
      c-nav-list(:handleClose="handleClose")
</template>

<script>
import CNavList from '../NavList'
export default {
  name: 'CNav',
  props: ['screenWidth'],
  components: {
    CNavList
  },
  data () {
    return {
      trigger: false
    }
  },
  methods: {
    handleClose () {
      this.trigger = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../sass/partials/mixin';
  .nav {
    padding-left: 32px;
    @include mobile {
      padding-left: 12px;
    }
    .category {
      i.i-menu {
        padding-left: 5px;
      }
    }

    }
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
