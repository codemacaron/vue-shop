<template lang="pug">
  main
    h1.join-title 제목을 작성해 주세요.
    .input-area
      input(v-model="name" type="text" ref="name" :class="{active : !getIsHasValue && isClicked && name.length === 0}" placeholder="예) 아기 물품 이름")
    .error-msg
      p(v-show="!getIsHasValue && isClicked && name.length === 0") 제목을 입력해주세요!
    .group-btn
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
      edit: {
        content: ''
      }
    }
  },
  components: {
    CListcomponent
  },
  computed: {
    // 타이틀 값을 v-model로 연결하는 방법
    name: {
      set (value) {
        value = value.trim()
        this.$store.dispatch('setName', value)
      },
      get () {
        // 값을 가져오는 역활
        return this.$store.getters.getName
      }
    },
    ...mapGetters([
      'getIsHasValue'
    ])
  },
  created () {
    this.$store.dispatch('setChangeContent', 'false')
  },
  methods: {
    ...mapActions([
    ]),
    // 다음페이지로 연결
    setNextPage (payload) {
      let value = this.$store.getters.getName
      value = value.trim()
      this.isClicked = true
      this.$store.dispatch('setChageHasValue', false)
      let getIsHasValue = this.$store.getters.getIsHasValue
      if (value.length === 0) {
        return this.$refs.name.focus()
      }
      if (value.length > 0 && !getIsHasValue) {
        this.$router.push({ name: 'AddPage1' })
        this.isClicked = false
        this.$store.dispatch('setSaveContent', this.edit)
      }
    }
  }
}

</script>

<style lang="scss" scoped>
@import "./../sass/partials/_fonts";
@import "./../sass/partials/_color";

.input-area {
  font-size: $font-m;
  input[type="text"] {
    width: 100%;
    margin-right: 5px;
    padding: 20px 10px;
    border: $border;
    font-size: $font-m;
    &.active {
      border: 1px solid $color-point;
    }
  }
}
</style>
