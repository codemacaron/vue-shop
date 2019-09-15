<template lang="pug">
  .popup
    div
      h1 제목 :: {{ getPopupValue.title }}
      h2 내용
      p {{ getPopupValue.content }}
      button(type="button" @click="setClose()") 닫기
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'C-Popup',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'getPopupValue'
    ])
  },
  methods: {
    // 팝업 닫기
    setClose () {
      this.$store.dispatch('setClose')
    }
  }
}
</script>

<style lang="scss">
@import "./../../sass/partials/_fonts";
.popup {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(#000, 0.4);
  div {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 500px;
    height: 500px;
    background: #fff;
    padding: 20px;
    h1,
    h2 {
      font-size: $font-m;
    }
    p {
      overflow: auto;
      max-height: 300px;
      white-space: pre-line;
    }
    button {
      position: absolute;
      right: 20px;
      top: 20px;
      width: 30px;
      height: 30px;
      background: none;
      border: 0 none;
      overflow: hidden;
      &::after {
        position: absolute;
        left: 0;
        top: 0;
        content: "X";
        font-size: $font-l;
        display: block;
        width: 30px;
        height: 30px;
        line-height: 30px;
        background: #fff;
      }
    }
  }
}
</style>
