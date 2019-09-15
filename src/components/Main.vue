<template lang="pug">
  main(v-cloak)
    .search
      input(type="text")
      button.btn-search(type="button") 검색
    .cover
      button.btn-filter(type="button" @click="showPopup('open')") filter
      .filter-category(v-show="showFilter")
        div
          h1 카테고리 분류
          ul
            li
              input(id="reset" type="radio" name="category" :value="getRadioValue.amount" @input="updateFilter" checked)
              label(for="reset") 선택안함
            li(v-for="list in getFilter")
              input(:id="list.name" type="radio" name="category" :value="getRadioValue.amount" @input="updateFilter")
              label(:for="list.name") {{list.name}}
          button.btn-save(type="button" @click.prevent="showPopup('save')") 저장
          button.btn-close(type="button" @click.prevent="showPopup('close')") 닫기
      .filter-sort
        h1.a11y-hidden 순서 분류
        ul
          li
            input#ascendingSort(type="radio" name="sort" :value="getSortValue" @input.prevent="sortList" checked)
            label(for="ascendingSort") 오름차순
          li
            input#descendingSort(type="radio" name="sort" :value="getSortValue" @input.prevent="sortList")
            label(for="descendingSort") 내림차순
    C-Mainlist
    p.last-list(v-show="getStopList === false") 리스트가 더이상 없습니다.
    C-Loading
    C-User
</template>

<script>
import CLoading from './util/loading'
import CUser from './util/user'
import CMainlist from './util/MainList'
import { mapGetters } from 'vuex'

export default {
  name: 'Main',
  data () {
    return {
      'showFilter': false,
      'bottom': false
    }
  },
  components: {
    CMainlist,
    CLoading,
    CUser
  },
  computed: {
    ...mapGetters([
      'getFilter',
      'getRadioValue',
      'getSortValue',
      'getStopList'
    ])
  },
  methods: {
    // filter 팝업창
    showPopup (payload) {
      switch (payload) {
        case 'open':
          this.showFilter = true
          break
        case 'close':
          this.showFilter = false
          break
        case 'save':
          this.showFilter = false
          this.$store.dispatch('setResetList').then(() => {
            this.updateListAll('lists')
          })
          break
      }
    },
    // filter 관련
    updateFilter (e) {
      let id = e.target.id
      let payload = {
        'category': '',
        'dulation': 10
      }
      if (id.indexOf('reset') !== -1) {
        payload.category = 'reset'
        this.$store.dispatch('setRadio', payload)
      }
      if (id.indexOf('apple') !== -1) {
        payload.category = 'apple'
        this.$store.dispatch('setRadio', payload)
      }
      if (id.indexOf('banana') !== -1) {
        payload.category = 'banana'
        this.$store.dispatch('setRadio', payload)
      }
      if (id.indexOf('coconut') !== -1) {
        payload.category = 'coconut'
        this.$store.dispatch('setRadio', payload)
      }
    },
    // 오름차순 / 내림차순
    sortList (e, payload) {
      e.preventDefault()
      let id = e.target.id
      payload = {
        'sort': '',
        'dulation': 10
      }
      this.sort = ''
      if (id.indexOf('ascendingSort') !== -1) {
        payload.sort = 'asc'
      } else if (id.indexOf('descendingSort') !== -1) {
        payload.sort = 'desc'
      }
      this.$store.dispatch('setResetList').then(() => {
        this.$store.dispatch('setSortList', payload)
      }).then(() => {
        this.updateListAll('lists')
      })
    },
    saveLocalStorage () {
      localStorage.getMixList = this.$store.getters.getMixList
    },
    // 리스트 불러오기
    updateListAll (payload) {
      let stategGtTextWhatIsPost = this.$store.getters.getTextWhatIsPost
      let updateListAllPayload = {
        'type': payload,
        // 객체로 보냄
        'whatIsPost': stategGtTextWhatIsPost
      }
      this.$store.dispatch('setLists', updateListAllPayload).then(() => {
        setTimeout(() => {
          this.$store.dispatch('setMixPost', updateListAllPayload.whatIsPost)
        }, 2000)
      })
      this.saveLocalStorage()
    }
  },
  created () {
    // 서버에 리스트 요청
    let payloadAxiosAll = {
      'type': 'filter'
    }
    let payloadLists = {
      'type': 'lists',
      'whatIsPost': {
        'asc': true,
        'desc': false,
        'category': 'reset'
      }
    }
    let stateGetMixList = this.$store.getters.getMixList
    if (stateGetMixList.length === 0) {
      this.$store.dispatch('setAxiosAll', payloadAxiosAll)
      this.$store.dispatch('setLists', payloadLists).then(() => {
        setTimeout(() => {
          this.$store.dispatch('setMixPost', payloadLists.whatIsPost)
        }, 1000)
      })
    }
  }
}

</script>

<style lang="scss" scoped>
@import "./../sass/partials/_fonts";
@import "./../sass/partials/_color";
@import "./../sass/partials/_mixin";
// 변수 모음
$height: 50px;
$top-height: calc(50px * 2);
$padding: 10px;
$double-padding: calc(10px * 2);
.search {
  width: 612px;
  margin-bottom: 20px;
  text-align: right;
  input[type="text"] {
    border: 1px solid #dedfdf;
    padding: 10px 20px;
    font-size: $font-m;
  }
  .btn-search{
    vertical-align: 1px;
    position: relative;
    display: inline-block;
    overflow: hidden;
    width: 40px;
    height: 40px;
    line-height: 40px;
    border: 0 none;
    background: red;
    &::after{
      font-family: 'FontAwesome';
      content: '\f002';
      position: absolute;
      left: 0;
      top: 0;
      width: 40px;
      height: 40px;
      line-height: 40px;
      background: #dedfdf;
    }
  }
}
.cover{
  width: 614px;
  @include clearfix;
  button {
    display: block;
    height: 30px;
    line-height: 30px;
    border: 0 none;
    font-size: $font-m;
    &.btn-save {
      padding: 0 20px;
      margin: 0 auto;
      background: $color-point;
      color: $color-white;
    }
    &.btn-filter {
      float: left;
      padding: 0 20px;
      background: $color-point;
      color: $color-white;
    }
    &.btn-close {
      position: absolute;
      right: 0;
      top: 0;
      overflow: hidden;
      width: $height;
      height: $height;
      border-bottom: $border;
      color: $color-point;
      &::before {
        position: absolute;
        left: 0;
        top: 0;
        content: "✕";
        display: block;
        width: $height;
        height: $height;
        background: #fff;
        font-size: $font-xl;
        line-height: $height;
        text-align: center;
      }
    }
    &.btn-get-list {
      position: relative;
      display: block;
      width: 100%;
      height: 50px;
      line-height: 50px;
      background: $color-point;
      color: $color-white;
      font-size: $font-m;
    }
  }
}
.filter-category {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  > div {
    position: absolute;
    left: 50%;
    top: 50%;
    padding-bottom: 10px;
    transform: translateX(-50%) translateY(-50%);
    background: #fff;
    > h1 {
      width: 100%;
      height: $height;
      padding: 0 $padding;
      margin: 0;
      border-bottom: $border;
      line-height: $height;
      color: $color-point;
      font-size: $font-m;
    }
    > ul {
      list-style: none;
      padding: $padding;
      margin-bottom: 20px;
      > li {
        &::before {
          content: "";
          display: inline-block;
        }
      }
    }
  }
}
.filter-sort {
  float: right;
  > ul {
    margin: 0;
    @include clearfix;
    list-style: none;
    > li {
      float: left;
      line-height: 30px;
      &::before {
        content: "";
        display: inline-block;
        padding: 0 20px;
      }
      &:first-of-type {
        &::before {
          content: "";
          padding: 0;
        }
      }
    }
  }
}
.last-list {
  text-align: center;
  font-size: $font-m;
  color: $color-point;
}
input[type="radio"] {
  position: relative;
  overflow: hidden;
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 0px;
  vertical-align: middle;
  margin-right: 10px;
  &:focus {
    outline: 0 none;
  }
  &::before {
    content: '';
    display: block;
    box-sizing: border-box;
    width: 20px;
    height: 20px;
    border-radius: 20px;
    background: #f37878;
  }
  &:checked {
    &::before {
      background: #fff;
      border: 7px solid #f37878;
    }
  }
}
label {
  vertical-align: middle;
  text-transform: capitalize;
}
@keyframes loading {
  from {
    transform: translate(0px, 0px);
  }
  25% {
    transform: translate(0px, -10px);
  }
  to {
    transform: translate(0px, 0px);
  }
}

@include mobile {
  .filter-category {
    > div {
      width: 90%;
      > ul {
        > li {
          margin-bottom: 10px;
          &:last-of-type {
            margin-bottom: 0px;
          }
        }
      }
    }
  }
}
@include breakpoint(768px, 999999px) {
  .filter-category {
    > div {
      width: 470px;
      > ul {
        @include clearfix;
        > li {
          float: left;
          &::before {
            padding-left: 20px;
          }
          &:first-of-type {
            &::before {
              padding-left: 0px;
            }
          }
        }
      }
    }
  }
}
</style>
