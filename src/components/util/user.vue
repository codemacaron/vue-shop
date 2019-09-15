<template lang="pug">
  .user
    .login
      button.btn-login(type="button" @click="onClickLoginArea('open')") 로그인
      button.btn-join(type="button" @click="onClickJoinArea('open')") 회원가입
    C-Login(v-show="getLoginArea")
    C-Join(v-show="getJoinArea")
    .logout
      p
        a(href="#") 홍길동
        | 님 안녕하세요
      button.btn-page(type="button" @click="onWritePage()") 등록
      button.btn-logout(type="button" @click="onLogout()") 로그아웃
</template>
<script>
import { mapGetters } from 'vuex'
import CLogin from './login'
import CJoin from './join'
export default {
  name: 'C-User',
  data () {
    return {
      'isJoinShow': false,
      'isLoginShow': false
    }
  },
  components: {
    CJoin,
    CLogin
  },
  computed: {
    ...mapGetters([
      'getLoginArea',
      'getJoinArea'
    ])
  },
  methods: {
    onClickLoginArea (payload) {
      this.$store.dispatch('setLoginArea', payload)
    },
    onClickJoinArea (payload) {
      this.$store.dispatch('setJoinArea', payload)
    },
    onWritePage () {
      this.$router.push({ name: 'AddPage0' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./../../sass/partials/_fonts";
@import "./../../sass/partials/_color";
@import "./../../sass/partials/_mixin";
.user{
  position: fixed;
  left: 50%;
  top: 70px;
  width: 250px;
  margin-left: 200px;
  background: #fff;
  border: $border;
}
</style>
