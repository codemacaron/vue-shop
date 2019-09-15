<template lang="pug">
  main
    h1.join-title
      | {{getName}}에 대해 소개글을 작성해주세요.
    h2.join-title
      | {{getName}}은
      CListcomponent
      | 을 전문으로 하는 아기 물품 입니다.
    .editor-area
      p.point-msg * 아기 물품의 소개를 자세히 할 수록 고객에게 어필 될 수 있습니다.
      vue-html5-editor(@change="contentChange" :content="textcontent" :height="500" :z-index="0")
    .error-msg
      p(v-show="!getIsHasValue && isClicked && content.length !== 0") 내용을 입력해주세요!
    .group-btn
      button.prev(type="button" @click="setNextPage('prev')") 이전단계
      button.next(type="button" @click="setNextPage('next')") 저장 후 다음단계
</template>

<script>
import CListcomponent from './util/list-component'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Join',
  data () {
    return {
      isClicked: false,
      text: '',
      textcontent: ''
    }
  },
  components: {
    CListcomponent
  },
  computed: {
    ...mapGetters([
      'getIsHasValue',
      'getName'
    ])
  },
  created () {
    this.getEditValue()
    this.$store.dispatch('setChangeContent', 'false')
  },
  methods: {
    ...mapActions([
    ]),
    // 만약 값이 있으면 넣기
    getEditValue () {
      console.log(this.$store.getters.getContent)
      let data = this.$store.getters.getContent
      if (data.length !== 0) {
        this.textcontent = data
        this.$store.dispatch('setChangeContent', 'true')
      }
    },
    // 에디터에서 값이 바뀌는 것을 뷰엑스에 적용
    contentChange (data) {
      let dataTrim = data.trim()
      let dataLength = dataTrim.length
      this.textcontent = data
      if (dataLength !== 0) {
        this.$store.dispatch('setChangeContent', 'true')
      }
    },
    // 다음페이지로 연결
    setNextPage (payload) {
      this.isClicked = true
      let getIsHasValue = this.$store.getters.getIsHasValue

      switch (payload) {
        case 'prev':
          this.$router.push({ name: 'AddPage1' })
          this.$store.dispatch('setChageHasValue')
          break
        case 'next':
          if (getIsHasValue === true) {
            this.$router.push({ name: 'AddPage3' })
            this.isClicked = false
            this.$store.dispatch('setSaveContent', this.textcontent)
          }
          break
      }
    }
  }
}

</script>

<style lang="scss" scoped>
@import "./../sass/partials/_fonts";
@import "./../sass/partials/_color";
</style>
