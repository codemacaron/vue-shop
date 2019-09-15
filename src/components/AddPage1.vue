<template lang="pug">
  main
    div
      h1.join-title
        | {{getName}}
      //- .group-btn(v-show="!getJoin3Value")
        //- button.prev(type="button" @click="setNextPage()") 이전단계
    .cover
      C-Write
      C-Menu
</template>

<script>
import CListcomponent from './util/list-component'
import CWrite from './util/write'
import CMenu from './util/menu'
import { mapGetters } from 'vuex'

export default {
  name: 'Join',
  data () {
    return {
      isClicked: false,
      onlyOne: false
    }
  },
  components: {
    CListcomponent,
    CWrite,
    CMenu
  },
  computed: {
    ...mapGetters([
      'getIsHasValue',
      'getContent',
      'getName'
    ])
  },
  methods: {
    // 다음페이지로 연결
    setNextPage () {
      this.isClicked = true
      this.$router.push({ name: 'AddPage2' })
      this.$store.dispatch('setChageHasValue').then(() => {
        this.isClicked = false
      })
    }
    // setShowNextStep () {
    //   this.$store.dispatch('setJoinValue')
    // }
  }
}

</script>

<style lang="scss" scoped>
@import "./../sass/partials/_fonts";
@import "./../sass/partials/_color";
@import "./../sass/partials/_mixin";

.cover{
  margin-top: 50px;
  @include clearfix;
  >div {
    float: left;
    border: $border;
    box-sizing: border-box;
    padding: 20px;
    &:first-of-type {
      width: 69%;
      margin-right: 1%;
    }
    &:last-of-type {
      width: 30%;
    }
  }
}
h2.join-title {
  font-size: $font-m;
  margin-bottom: 10px;
  text-align: left;
}
.cover {
  margin-top: 50px;
}
</style>
