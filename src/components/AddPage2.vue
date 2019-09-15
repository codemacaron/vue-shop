<template lang="pug">
  main
    h2.join-title
      | {{getName}}는
      C-Listcomponent
      | 을 전문으로 합니다.
    .data-area(v-html="getContent")
    h2.join-title 메뉴
    ul.list-num
      li(v-for="(list, index) in getMenuList")
        a(@click="onClickNum(index)" :class="{active : clickNum === index}") {{index}}
    ul.list-content
      li(v-for="(list, index) in getMenuList" )
        div.data-area(:class="{active : clickNum === index}")
          h2 메뉴명 : {{list.title}}
          p 금액 : {{list.money}}
          p 메뉴 간단설명 : {{list.content}}
          .group-btn
            button.prev(type="button" @click="onClickRewrite(index)") 수정
            button.next(type="button" @click="setDelete(index)") 삭제
    h2.join-title 작성이 틀렸으면, 수정하기 버튼을 눌러 글을 보완하거나 메뉴를 추가해보세요.
    .group-btn
      button.prev(type="button" @click="setNextPage('prev')") 이전단계
      button.next(type="button" @click="setNextPage('next')") 저장 후 목록으로
</template>

<script>
import CListcomponent from './util/list-component'
import { mapGetters } from 'vuex'

export default {
  name: 'Join',
  data () {
    return {
      isClicked: false,
      clickNum: 0
    }
  },
  components: {
    CListcomponent
  },
  computed: {
    ...mapGetters([
      'getIsHaveValue',
      'getMenuList',
      'getContent',
      'getName'
    ])
  },
  methods: {
    onClickNum (payload) {
      this.clickNum = payload
    },
    setNextPage (payload) {
      switch (payload) {
        case 'prev':
          this.$store.dispatch('setClear')
          this.$router.push({ name: 'AddPage3' })
          break
        case 'next':
          this.$store.dispatch('setSaveAll').then(() => {
            this.$store.dispatch('setClearAll')
          })
          this.$router.push({ name: 'Main' })
          break
      }
    },
    setDelete (payload) {
      this.$store.dispatch('setDelete', payload)
    },
    // 수정하기
    onClickRewrite (payload) {
      this.$store.dispatch('setRewrite', payload)
      this.$router.push({ name: 'AddPage3' })
    }
  }
}

</script>

<style lang="scss" scoped>
@import "./../sass/partials/_fonts";
@import "./../sass/partials/_color";
@import "./../sass/partials/_mixin";

h1.join-title {
  font-size: $font-m;
  margin-bottom: 10px;
  text-align: left;
}

.list-num, .list-content{
  @include clearfix;
  list-style: none;
  padding-left: 0;
  li {
    float: left;
  }
}
.list-num{
  li {
    margin-left: 5px;
    &:first-of-type{
      margin-left: 0px;
    }
    a {
      display: block;
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border: $border;
      &:hover {
        border: $border-dark;
        text-decoration: none;
      }
      &.active {
        border: $border-point;
      }
    }
  }
}
.list-content{
  li {
    width: 100%;
    >div{
      display: none;
      &.active{
        display: block;
      }
    }
  }
}
</style>
