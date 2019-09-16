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
          ul.nav-container
            li.nav-item
              router-link(to="/my") 채소
            li.nav-item 과일
            li.nav-item 소스
        el-button(plain) 로그아웃
    nav(v-else)
      ul.nav-container
        li.nav-item
          router-link(to="/my") 채소
        li.nav-item 과일
        li.nav-item 소스
</template>

<script>
export default {
  name: 'CNav',
  props: ['screenWidth'],
  data () {
    return {
      trigger: false
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
