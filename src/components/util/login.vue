<template lang="pug">
  .join-popup
    div
      .sns-login
        h1 소셜 로그인
        button.btn-facebook(type="button") 페이스북 계정으로 로그인
        button.btn-google(type="button") 구글 계정으로 로그인
        //- button.btn-naver(type="button") 네이버 계정으로 로그인
        button.btn-kakao(type="button") 카카오톡 계정으로 로그인
      .lacal-login
        h1 이메일 로그인
        input.input-id(type="text" placeholder="아이디 ::: 예) abc@example.com")
        //- var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        //- / / 안에 있는 내용은 정규표현식 검증에 사용되는 패턴이 이 안에 위치함
        //- / /i 정규표현식에 사용된 패턴이 대소문자를 구분하지 않도록 i를 사용함
        //- ^ 표시는 처음시작하는 부분부터 일치한다는 표시임
        //- [0-9a-zA-Z] 하나의 문자가 []안에 위치한 규칙을 따른다는 것으로 숫자와 알파벳 소문지 대문자인 경우를 뜻 함
        //- * 이 기호는 0또는 그 이상의 문자가 연속될 수 있음을 말함
        input.input-password(type="password" placeholder="비밀번호")
        span.point * 특수문자 / 문자 / 숫자 포함 형태의 8~15자리 이내의 암호
        //- var regex = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
        button.btn-login(type="button") 로그인
      .other-login
        button.btn-join(type="button") 회원가입
        button.btn-later(type="button" @click="onClickLoginArea('close')") 나중에 하기
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'C-Login',
  data () {
    return {
      login: false
    }
  },
  computed: {
    ...mapGetters([
      // 'getIsHasValue',
    ])
  },
  methods: {
    onClickLoginArea (payload) {
      this.$store.dispatch('setLoginArea', payload)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./../../sass/partials/_fonts";
@import "./../../sass/partials/_color";
@import "./../../sass/partials/_mixin";

.join-popup {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba($color: #000, $alpha: 0.8);
  > div {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 500px;
    height: auto;
    padding: 30px;
    transform: translate(-50%, -50%);
    background: $color-white;
    h1 {
      font-size: $font-xl;
      text-align: center;
    }
    p {
      margin: 30px auto;
      padding: 10px 20px;
      line-height: 30px;
      border: $border;
      word-break: break-all;
      strong {
        color: $color-point;
        margin-left: 5px;
      }
    }
  }
  .input-id,
  .input-password{
    width: 100%;
    height: 40px;
    line-height: 40px;
    margin-bottom: 10px;
    padding: 0 20px;
    border: $border;
    font-size: $font-m;
  }
  .btn-login{
    width: 100%;
    margin: 0;
    background: $color-point;
    color: $color-white;
    border: 0 none;
    height: 40px;
    line-height: 40px;
    &:hover{
      background: $color-point-dark;
    }
  }
  .lacal-login{
    margin-top: 20px;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-top: $border;
    border-bottom: $border;
  }
  .other-login{
    text-align: center;
    .btn-later {
      display: inline-block;
      padding: 0;
      margin: 0;
    }
  }
  .point{
    display: block;
    font-size: $font-s;
    color: $color-point;
    margin-bottom: 10px;
  }
}

</style>
