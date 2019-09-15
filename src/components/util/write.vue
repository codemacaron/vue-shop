<template lang="pug">
  div
    h2.join-title 물품명
    div.input-area
      input(v-model="editTitle" type="text" ref="title" :class="{active : !getIsHasValue && isClicked && editTitle.length === 0}" placeholder="예) 간장떡볶이")
    //- p this.$store.getters.getMenuTitle ::: {{this.$store.getters.getMenuTitle}}
    //- p getMenuTitle ::: {{getMenuTitle}}
    .error-msg(v-show="!getIsHasValue && isClicked && editTitle.length === 0")
      p 메뉴명을 입력해주세요!
    hr
    h2.join-title 카테고리
    ul.category-area
      li(v-for="(list, index) in getBabyList")
        input#category(type="checkbox" ref="category" name="category" :id="'category' + index" :checked="list.value" @click="editCategory($event)" :class="['category' + index, {active : !getIsHasValue && isClicked && getMenuCategory.length === 0}]" )
        label(:for="'category' + index") {{list.text}}
    //- p ref ::: {{this.$refs.category}}
    //- p getMenuCategory.length ::: {{getMenuCategory.length}}
    //- p getMenuCategory ::: {{getMenuCategory}}
    .error-msg(v-show="!getIsHasValue && isClicked && getMenuCategory.length === 0")
      p 아기 물품의 종류를 선택해주세요!
    hr
    h2.join-title 물품 금액
    div.input-area
      input(v-model="editMoney" type="number" ref="money" :class="{active : !getIsHasValue && isClicked && editMoney.length === 0}" placeholder="예) 18000")
      | 원
    //- p this.$store.getters.getMenuMoney ::: {{this.$store.getters.getMenuMoney}} 원
    //- p getMenuMoney ::: {{getMenuMoney}} 원
    .error-msg(v-show="!getIsHasValue && isClicked && editMoney.length === 0")
      p 금액을 입력해주세요!
    hr
    h2.join-title 물품 이미지 등록
    div.input-area
      input(@change="editFile" type="file" ref="file" :class="{active : !getIsHasValue && isClicked && getMenuFile.length === 0}")
    p getMenuFile.length ::: {{getMenuFile.length}}
    p this.$store.getters.getMenuFile ::: {{this.$store.getters.getMenuFile}}
    p getMenuFile ::: {{getMenuFile}}
    .error-msg(v-show="!getIsHasValue && isClicked")
      p 사진을 등록해주세요
    hr
    h2.join-title 물품에 대해 간단 소개해주세요.
    div.text-area
      textarea(v-model="editContent" ref="content" :class="{active : !getIsHasValue && isClicked && editContent.length === 0 }" placeholder="하하..")
    p this.$store.getters.getMenuContent ::: {{this.$store.getters.getMenuContent}}
    p getMenuContent ::: {{getMenuContent}}
    .error-msg(v-show="!getIsHasValue && isClicked && editContent.length === 0")
      p 내용을 입력해주세요!
    hr
    .group-btn
      button.prev(type="button" @click="setShowNextStep()") 이전단계
      button.next(type="button" @click="setSave()") 메뉴 저장
</template>
<script>
import { mapGetters } from 'vuex'
import CCategory from './category'
// import { log } from 'util';
// import { log } from 'util';

export default {
  name: 'C-Write',
  data () {
    return {
      isClicked: false
    }
  },
  components: {
    CCategory
  },
  computed: {
    // 타이틀
    editTitle: {
      set (value) {
        value = value.trim()
        this.$store.dispatch('setFirstList')
        // 값을 저장하는 역활
        let payload = {
          'value': value,
          'type': 'title',
          'index': this.$store.getters.getChangeIndex
        }
        this.$store.dispatch('setValue', payload)
      },
      get () {
        // 값을 가져오는 역활
        return this.$store.getters.getMenuTitle
      }
    },
    // 돈
    editMoney: {
      set (value) {
        // 값을 저장하는 역활
        let payload = {
          'value': value,
          'type': 'money',
          'index': this.$store.getters.getChangeIndex
        }
        this.$store.dispatch('setValue', payload)
      },
      get () {
        // 값을 가져오는 역활
        return this.$store.getters.getMenuMoney
      }
    },
    // 사진파일
    // editFile: {
    //   set (event) {
    //     console.log(event)
    //     let payload = {
    //       'value': event.target.value,
    //       'type': 'file',
    //       'index': this.$store.getters.getChangeIndex
    //     }
    //     this.$store.dispatch('setValue', payload)
    //   },
    //   get () {
    //     // 값을 가져오는 역활
    //     return this.$store.getters.getMenuFile
    //   }
    // },
    // 설명
    editContent: {
      set (value) {
        let payload = {
          'value': value,
          'type': 'content',
          'index': this.$store.getters.getChangeIndex
        }
        this.$store.dispatch('setValue', payload)
      },
      get () {
        // 값을 가져오는 역활
        return this.$store.getters.getMenuContent
      }
    },
    ...mapGetters([
      'getBabyList',
      'getIsHasValue',
      'getAListEdit',
      'getName',
      'getMenuTitle',
      'getMenuCategory',
      'getMenuMoney',
      'getMenuFile',
      'getMenuContent'
    ])
  },
  methods: {
    setShowNextStep () {
      this.isClicked = true
      this.$router.push({ name: 'AddPage0' })
      this.$store.dispatch('setChageHasValue').then(() => {
        this.isClicked = false
      })
    },
    setSave () {
      let changeIndex = this.$store.getters.getChangeIndex
      this.isClicked = true
      this.$store.dispatch('setChageHasValue', false)
      let title = this.$store.getters.getMenuTitle
      let category = this.$store.getters.getMenuCategory
      let money = this.$store.getters.getMenuMoney
      let file = this.$store.getters.getMenuFile
      let content = this.$store.getters.getMenuContent

      let payload = {
        'title': title,
        'category': category,
        'money': money,
        'file': file,
        'content': content
      }
      if (title.length === 0 || category.length === 0 || money.length === 0 || file.length === 0 || content.length === 0) {
        if (title.length === 0) {
          return this.$refs.title.focus()
        } else if (category.length === 0) {
          return this.$refs.category[0].focus()
        } else if (money.length === 0) {
          return this.$refs.money.focus()
        } else if (file.length === 0) {
          return this.$refs.file.focus()
        } else if (content.length === 0) {
          return this.$refs.content.focus()
        }
      }

      if (changeIndex === undefined && title.length !== 0 && category.length !== 0 && money.length !== 0 && file.length !== 0 && content.length !== 0) {
        this.isClicked = false
        this.$store.dispatch('setChageHasValue', true)
        this.$store.dispatch('setSave', payload).then(() => {
          this.$store.dispatch('setClear')
        })
      }

      if (changeIndex !== undefined && title.length !== 0 && category.length !== 0 && money.length !== 0 && file.length !== 0 && content.length !== 0) {
        this.isClicked = false
        this.$store.dispatch('setChageHasValue', true)
        this.$store.dispatch('setSave', payload).then(() => {
          this.$store.dispatch('setClear')
        })
      }
    },
    editCategory (e) {
      let target = e.target.id
      let targetNum = target.replace(/[^0-9]/g, '')
      let payload = {
        'value': targetNum,
        'type': 'category',
        'index': this.$store.getters.getChangeIndex
      }
      this.$store.dispatch('setValue', payload)
    },
    editFile (e) {
      let payload = {
        'value': e.target.value,
        'type': 'file',
        'index': this.$store.getters.getChangeIndex
      }
      this.$store.dispatch('setValue', payload)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./../../sass/partials/_fonts";
@import "./../../sass/partials/_color";
@import "./../../sass/partials/_mixin";

h2.join-title {
  font-size: $font-m;
  margin-bottom: 10px;
  text-align: left;
}
.input-area {
  font-size: $font-m;
  input[type="text"] ,
  input[type="number"] {
    width: 80%;
    margin-right: 5px;
    padding: 20px 10px;
    border: $border;
    font-size: $font-m;
    &.active {
      border: 1px solid $color-point;
    }
  }
}
.text-area {
  font-size: $font-m;
  textarea {
    width: 100%;
    min-height: 200px;
    border: $border;
    padding: 20px 10px;
    font-size: $font-m;
    &.active {
      border: 1px solid $color-point;
    }
  }
}
.error-msg {
  margin-top: 10px;
  margin-bottom: 50px;
  p {
    text-align: left;
    font-size: $font-m;
  }
}
.category-area {
  display: flex;
  flex-flow: row wrap;
  list-style: none;
  padding-left: 0;
  li {
    width: 33.33%;
    margin-bottom: 10px;
    input[type="checkbox"] {
      position: relative;
      width: 20px;
      height: 20px;
      margin-right: 10px;
      &::before {
        position: absolute;
        left: 0;
        top: 0;
        content: "";
        width: 20px;
        height: 20px;
        line-height: 18px;
        text-align: center;
        background: #fff;
        border: $border;
        font-size: 18px;
      }
      &.active {
        &::before {
          border: $border-point;
        }
      }
      &:focus{
        outline: -webkit-focus-ring-color auto 5px;
      }
    }
    input:checked {
      &::before {
        content: '✓';
      }
    }
  }
}
</style>
