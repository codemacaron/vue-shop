<template lang="pug">
  #app.container
    c-header
    router-view
    c-footer
    button.btn-goto-top(type="button" @click="scrollToTop()") 위로가기
    // el-button Default
</template>

<script>
// import { Button, Select } from 'element-ui'
import CHeader from './components/common/header'
import CFooter from './components/common/footer'
export default {
  name: 'App',
  methods: {
    // 상단으로 가는 버튼
    scrollToTop () {
      window.scrollTo(0, 0)
    }
  },
  components: {CHeader, CFooter}
}
</script>

<style lang="scss">
@import "./sass/App";
@font-face {
  font-family: "Nanum Square";
  src: url("./assets/font/NanumSquareR.eot");
  src: url("./assets/font/NanumSquareR.eot?#iefix") format("embedded-opentype"),
    url("./assets/font/NanumSquareR.woff") format("woff"),
    url("./assets/font/NanumSquareR.ttf") format("truetype"),
    url("./assets/font/NanumSquareOTFR.svg#9e23ceb0c858ca37642ba540402577eb")
      format("svg");
  font-style: normal;
  font-weight: 400;
}
@font-face {
  font-family: "Nanum Square";
  src: url("./assets/font/NanumSquareB.eot");
  src: url("./assets/font/NanumSquareB.eot?#iefix") format("embedded-opentype"),
    url("./assets/font/NanumSquareB.woff") format("woff"),
    url("./assets/font/NanumSquareB.ttf") format("truetype"),
    url("./assets/font/NanumSquareOTFB.svg#a41a1fda1fdf3dafd3394867a156b1cf")
      format("svg");
  font-style: normal;
  font-weight: 700;
}
* {
  box-sizing: border-box;
}
[v-cloak] {
  display: none;
}
.a11y-hidden {
  @extend %readable-hidden;
}
#app {
  font-family: "Nanum Square", "Avenir", Helvetica, Arial, sans-serif;
  text-align: left;
  color: $color-text;
}
button,
a {
  &.link-goto-list,
  &.btn-modify,
  &.btn-delete,
  &.btn-facebook,
  &.btn-google,
  &.btn-naver,
  &.btn-kakao,
  &.btn-later,
  &.btn-join,
  &.btn-login,
  &.btn-logout,
  &.btn-join-m,
  &.btn-page{
    display: block;
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    border: 0 none;
    font-size: $font-m;
  }
  &.link-goto-list {

    background: $color-point;
    color: $color-white;
    display: inline-block;
    &:hover {
      background: $color-point-dark;
    }
  }
  &.btn-modify,
  &.btn-delete {
    display: inline-block;
    margin-right: 5px;
    border: $border-point;
    background: $color-white;
    color: $color-point;
    &:hover {
      border: 1px solid $color-point-dark;
      background: $color-point;
      color: $color-white;
    }
  }
  &.btn-facebook {
    width: 100%;
    height: 40px;
    margin: 0 auto 10px auto;
    padding: 0;
    background: #3b5998;
    color: $color-white;
    line-height: 40px;
    &:hover {
      background: darken(#3b5998, 5%);
    }
  }
  &.btn-google {
    width: 100%;
    height: 40px;
    margin: 0 auto 10px auto;
    padding: 0;
    background: #ea4335;
    color: $color-white;
    line-height: 40px;
    &:hover {
      background: darken(#ea4335, 5%);
    }
  }
  &.btn-naver {
    width: 100%;
    height: 40px;
    margin: 0 auto 10px auto;
    padding: 0;
    background: #00bd39;
    color: $color-white;
    line-height: 40px;
    &:hover {
      background: darken(#00bd39, 5%);
    }
  }
  &.btn-kakao {
    width: 100%;
    height: 40px;
    margin: 0 auto 10px auto;
    padding: 0;
    background: #fdc324;
    color: $color-white;
    line-height: 40px;
    &:hover {
      background: darken(#fdc324, 10%);
    }
  }
  &.btn-later {
    padding: 0;
    background: $color-white;
    margin: 50px auto 0 auto;
  }
  &.btn-logout,
  &.btn-join {
    display: inline-block;
    margin-right: 20px;
    border: $border-point;
    background: $color-white;
    color: $color-point;
    &:hover {
      border: 1px solid $color-point-dark;
      background: $color-point;
      color: $color-white;
    }
  }
  &.btn-login,
  &.btn-page{
    display: inline-block;
    margin-left: 20px;
    border: 1px solid $color-light;
    background: $color-white;
    color: $color-light;
    &:hover {
      border: 1px solid $color-point;
      background: $color-white;
      color: $color-point;
    }
  }
  &.btn-join-m {
    display: block;
    margin: 20px auto 0 auto;
    background: $color-point;
    color: $color-white;
  }
  &.btn-goto-top {
    position: fixed;
    display: block;
    width: 70px;
    height: 70px;
    line-height: 40px;
    padding: 30px 0 0 0;
    border: 0 none;
    background: $color-point;
    color: $color-white;
    font-size: $font-s;
    &::before {
      position: absolute;
      left: 0;
      top: 0;
      content: "^";
      display: block;
      width: 70px;
      height: 30px;
      line-height: 60px;
      font-size: 40px;
      text-align: center;
    }
  }
}

main {
  // border: $border;
  // padding: 50px;
}

.error-msg {
  margin-top: 50px;
  p {
    text-align: center;
    font-weight: bold;
    font-size: $font-l;
    color: $color-point;
  }
}

.point-msg {
  margin: 10px 0;
  text-align: left;
  font-weight: bold;
  font-size: $font-s;
  color: $color-lighter;
}

.group-btn {
  margin-top: 50px;
  text-align: center;
  button {
    display: inline-block;
    width: auto;
    height: 50px;
    line-height: 50px;
    padding: 0 20px;
    border: 0 none;
    &.prev {
      background: $color-white;
      border: $border-point;
      color: $color-point;
      margin-right: 10px;
      &:hover {
        border: $border-point-dark;
        background: $color-white;
        color: $color-point-dark;
      }
    }
    &.next {
      background: $color-point;
      border: $border-point;
      color: $color-white;
      &:hover {
        border: $border-point-dark;
        background: $color-point-dark;
      }
    }
  }
}

h1.join-title {
  line-height: 50px;
  text-align: center;
  font-size: $font-xl;
  margin-bottom: 50px;
  font-weight: bold;
  strong {
    > span {
      display: inline-block;
      padding: 0 20px;
      margin: 0 5px;
      background: $color-point;
      color: $color-white;
      height: 40px;
      line-height: 40px;
      border-radius: 40px;
      &:hover {
        background: $color-point-dark;
        cursor: default;
      }
    }
  }
}

h2.join-title {
  line-height: 30px;
  margin-bottom: 10px;
  font-size: $font-l;
  font-weight: bold;
  &.text-right {
    text-align: right;
  }
  strong {
    span {
      border-bottom: $border;
      padding-bottom: 2px;
      margin-right: 10px;
      &:first-of-type {
        margin-left: 10px;
      }
      &::after {
        content: ",";
        display: inline-block;
      }
      &.active {
        margin-right: 5px;
        &::after {
          content: "";
          margin-right: 0px;
        }
      }
    }
  }
}

.data-area {
  padding: 20px 10px;
  border: $border;
  background: #eeefef;
}
@include mobile {
  button.btn-goto-top {
    right: 10px;
    bottom: 10px;
  }
}

@include tablet {
  button.btn-goto-top {
    right: 10px;
    bottom: 10px;
  }
}

@include desktop {
  button.btn-goto-top {
    left: 50%;
    bottom: 40px;
    transform: translateX(520px);
  }
  main {
    width: 1000px;
    margin: 0 auto;
  }
}

@include breakpoint(0px, 768px) {
  main {
    box-sizing: border-box;
    width: 98%;
    margin: 0 auto;
  }
}
</style>
