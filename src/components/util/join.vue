<template lang="pug">
  .join-popup
    div
      .sns-join
        h1 회원가입
        p
          | 지금 가입하면 꿈꾸던 기업에 재직 중인 현직자와
          strong 익명
          | 으로 대화할 수 있습니다.
        button.btn-facebook(type="button") 페이스북 계정으로 회원가입
        button.btn-google(type="button") 구글 계정으로 회원가입
        //- button.btn-naver(type="button") 네이버 계정으로 회원가입
        button.btn-kakao(type="button") 카카오톡 계정으로 회원가입
        button.btn-join(type="button" @click="onClickEmailJoin") 이메일로 회원가입
      .lacal-join(v-show="lacalJoin")
        h1 이메일 회원가입
        .id
          input.input-id(type="text" placeholder="아이디 ::: 예) abc@example.com")
          //- var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
          //- / / 안에 있는 내용은 정규표현식 검증에 사용되는 패턴이 이 안에 위치함
          //- / /i 정규표현식에 사용된 패턴이 대소문자를 구분하지 않도록 i를 사용함
          //- ^ 표시는 처음시작하는 부분부터 일치한다는 표시임
          //- [0-9a-zA-Z] 하나의 문자가 []안에 위치한 규칙을 따른다는 것으로 숫자와 알파벳 소문지 대문자인 경우를 뜻 함
          //- * 이 기호는 0또는 그 이상의 문자가 연속될 수 있음을 말함
          button.btn-email(type="button") 이메일 인증
          span.point * 이메일 주소로 작성해 주세요.
        .pw
          input.input-password(type="password" placeholder="비밀번호")
          input.input-repassword(type="password" placeholder="비밀번호 확인")
          span.point * 특수문자 / 문자 / 숫자 포함 형태의 8~15자리 이내의 암호
          //- var regex = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
          span.point * 일치하지 않습니다.
        .phone
          input.input-phone(type="number" placeholder="010-1111-1111")
          //- var regExp = /^\d{3}-\d{3,4}-\d{4}$/;
          button.btn-phone(type="button") 본인인증 확인
          span.point * 본인인증이 확인 되었습니다.
        .join
          button.btn-join(type="button" @click="onClickJoinSave('close')") 회원가입 완료
      button.btn-later(type="button" @click="onClickJoinArea('close')") 나중에 하기
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'C-Join',
  data () {
    return {
      join: false,
      lacalJoin: false
    }
  },
  computed: {
    ...mapGetters([
      // 'getIsHasValue',
    ])
  },
  methods: {
    onClickJoinArea (payload) {
      this.$store.dispatch('setJoinArea', payload)
      this.lacalJoin = false
    },
    onClickEmailJoin () {
      this.lacalJoin = true
    },
    onClickJoinSave (payload) {
      this.$store.dispatch('setJoinArea', payload)
      this.lacalJoin = false
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
  .input-password,
  .input-repassword,
  .input-phone{
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    border: $border;
    font-size: $font-m;
  }
  .input-id{
    display: inline-block;
    width: 74%;
    margin-right: 1%;
  }
  .input-password,
  .input-repassword{
    width: 100%;
    display: block;
    margin-bottom: 10px;
  }
  .input-phone{
    width: 74%;
    margin-right: 1%;
    padding: 0;
    text-align: center;
  }
  .sns-join{
    // margin-bottom: 20px;
    padding-bottom: 20px;
  }
  .lacal-join{
    margin-top: 20px;
    border-top: $border;
  }
  .btn-join {
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
  .btn-email {
    width: 25%;
    display: inline-block;
    background: $color-point;
    color: $color-white;
    border: 0 none;
    height: 40px;
    line-height: 40px;
    font-size: $font-m;
    vertical-align: -1px;
  }
  .point{
    display: block;
    font-size: $font-s;
    color: $color-point;
    margin-top: 10px;
  }
  .id{
    margin-bottom: 20px;
  }
  .pw{
    margin-bottom: 20px;
  }
  .phone{

  }
  .btn-phone{
    width: 25%;
    display: inline-block;
    background: $color-point;
    color: $color-white;
    border: 0 none;
    height: 40px;
    line-height: 40px;
    font-size: $font-m;
    vertical-align: -1px;
  }
  .join{
    .btn-join{
      margin-top: 20px;
    }
  }
}

</style>
