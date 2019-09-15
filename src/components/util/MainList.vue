<template lang="pug">
  .list(v-cloak)
    h1.a11y-hidden 리스트
    ul(v-show="getMixList !== []")
      li(v-for="(post, index) in getMixList")
        .cover(v-if="post !== undefined")
          .link-list(v-if="0 !== (index+1)%4 || index === 0")
            .user
              .user-img
                img(src="./../../assets/logo.png")
              .user-id
                span(v-show="post.email !== undefined") {{post.email}}
                span(v-show="post.email === undefined") 이메일이 없습니다.
            a(@click="onClickRenderLink(post)")
              h1(v-show="post.title !== undefined") {{post.title}}
              h1(v-show="post.title === undefined") 제목이 없습니다.
            ul.list-info
              li
                strong Category :::
                span(v-show="post.category_no === '1' || post.category_no === 1") Apple
                span(v-show="post.category_no === '2' || post.category_no === 2") Banana
                span(v-show="post.category_no === '3' || post.category_no === 3") Coconut
              li
                strong Number :::
                span(v-show="post.no !== undefined") {{post.no}}
                span(v-show="post.no === undefined") 번호가 없습니다.
              li
                strong Date :::
                span(v-show="post.updated_at !== undefined") {{post.updated_at}}
                span(v-show="post.updated_at === undefined") 등록 시간이 없습니다.
            C-Imglist

            //- a(@click="onClickRenderLink(post)")
            //-   h1(v-show="post.title !== undefined") {{post.title}}
            //-   h1(v-show="post.title === undefined") 제목이 없습니다.
              //- p(v-show="post.contents !== undefined") {{post.contents}}
              //- p(v-show="post.contents === undefined") 내용이 없습니다.
          .ad(v-else-if="0 === (index+1)%4 || index !== 0")
            .has-img(v-if="post.img !== undefined")
              h2 Sponsored
              .img-text
                .imgs
                  img(:src="`https://comento.cafe24.com/public/images/${post.img}`")
                div.text
                  h1(v-show="post.title !== undefined") {{post.title}}
                  h1(v-show="post.title === undefined") 제목이 없습니다.
                  p(v-show="post.contents !== undefined") {{post.contents}}
                  p(v-show="post.contents === undefined") 내용이 없습니다.
            .hasnot-img(v-if="post.img === undefined")
              h2 Sponsored
              h1(v-show="post.title !== undefined") {{post.title}}
              h1(v-show="post.title === undefined") 제목이 없습니다.
              p(v-show="post.contents !== undefined") {{post.contents}}
              p(v-show="post.contents === undefined") 내용이 없습니다.

</template>

<script>
import CImglist from './imglist'
import { mapGetters } from 'vuex'

export default {
  name: 'C-Mainlist',
  computed: {
    ...mapGetters([
      'getMixList',
      'getSortValue'
    ])
  },
  components: {
    CImglist
  },
  methods: {
    onClickImg (payload) {
      console.log(payload.index)
      switch (payload.type) {
        case 'prev':
          console.log('prev')
          break
        case 'next':
          console.log('next')
          break
      }
    },
    // 동적 라우터 연결
    onClickRenderLink (post) {
      let payload = true
      this.$store.dispatch('setChangePage', payload)
      this.$router.push({ name: 'Detail', query: { no: post.no, post: post } })
    },
    // 페이지의 맨 아래인지 확인하는 부분
    bottomVisible () {
      if (this.$store.getters.getCanDoit) {
        var scrollY = window.pageYOffset
        var visible = document.documentElement.clientHeight
        var pageHeight = document.documentElement.scrollHeight
        var bottomOfPage = visible + scrollY >= pageHeight
        return bottomOfPage || pageHeight < visible
      }
    },
    // 페이지 맨 아래라면 리스트 불러오기
    infiniteScroll () {
      // 연속으로 불러오지 않게 하는 기능 추가 작업 중
      let stateGetMixList = this.$store.getters.getMixList
      if (stateGetMixList.length === 0) {
        window.addEventListener('scroll', () => {
          this.bottom = this.bottomVisible()
          let stategetChangePage = this.$store.getters.getChangePage
          if (this.bottom === true && stategetChangePage === false) {
            this.updateListAll('lists')
          }
        })
      }
    },
    saveLocalStorage () {
      localStorage.getMixList = this.$store.getters.getMixList
    },
    // 리스트 불러오기
    updateListAll (payload) {
      this.$store.dispatch('setCanDoit').then(() => {
        this.$store.dispatch('setLoading', 'show')
        let stategGtTextWhatIsPost = this.$store.getters.getTextWhatIsPost
        let updateListAllPayload = {
          'type': payload,
          // 객체로 보냄
          'whatIsPost': stategGtTextWhatIsPost
        }
        this.$store.dispatch('setLists', updateListAllPayload).then(() => {
          setTimeout(() => {
            this.$store.dispatch('setMixPost', updateListAllPayload.whatIsPost)
            this.$store.dispatch('setLoading', 'noshow')
          }, 2000)
        })
        this.saveLocalStorage()
      })
    }
  },
  created () {
    this.infiniteScroll()
  }
}

</script>

<style lang="scss" scoped>
@import "./../../sass/partials/_fonts";
@import "./../../sass/partials/_color";
@import "./../../sass/partials/_mixin";
@import "./../../sass/partials/_base";

// 변수 모음
$height: 30px;
$double-height: calc(30px * 2);
$treble-height: calc(30px * 2);
$padding: 10px;
$double-padding: calc(10px * 2);
ul {
  list-style: none;
  padding-left: 0;
}
* {
  box-sizing: border-box;
}
.a11y-hidden {
  @extend %readable-hidden;
}
[v-cloak] {
  display: none;
}
.list {
  width: 614px;
  margin-top: 0px;
  > ul {
    > li {
      > .cover {
        border: $border;
        padding: 0;
        margin-bottom: 50px;
        > .link-list {
          position: relative;
          .user {
            padding: 0 $padding;
            height: 60px;
            line-height: 60px;
            border-bottom: $border;
            @include clearfix;
            .user-img{
              float: left;
              overflow: hidden;
              width: 32px;
              height: 32px;
              margin-top: 14px;
              margin-right: 10px;
              border-radius: 100%;
              border: $border;
              img{
                width: 100%;
                height: auto;
              }
            }
            .user-id {
              float: left;
            }
          }
          ul.list-info {
            width: 100%;
            height: $height;
            box-sizing: border-box;
            padding: 0 $padding;
            line-height: $height;
            border-bottom: $border;
            color: $color-regular;
            font-size: $font-s;
            text-align: right;
            @include clearfix;
            > li {
              float: left;
              &::before {
                display: inline-block;
                content: "|";
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
          a {
            display: block;
            padding: $padding;
            h1 {
              margin: 0;
              color: $color-point;
              font-size: $font-xl;
            }
            p {
              padding-top: $padding;
              margin: 0;
              color: $color-regular;
              font-size: $font-m;
            }
            &:hover {
              h1,
              p {
                text-decoration: underline;
              }
            }
          }
        }
        > .ad {
          position: relative;
          display: block;
          padding-top: $height;
          h1 {
            margin: 0 0 10px 0;
            color: $color-point;
            font-size: $font-xl;
          }
          h2 {
            position: absolute;
            left: 0;
            top: 0;
            width: 80%;
            height: $height;
            margin: 0;
            padding: 0 $padding;
            line-height: $height;
            color: $color-point;
            font-size: $font-m;
            @extend %text-ellipsis;
          }
          p {
            margin: 0;
            color: $color-regular;
            font-size: $font-m;
          }
          > .has-img {
            > .img-text {
              padding: 0 $padding $padding $padding;
              > div.text {
                padding: $padding;
              }
              > div.imgs {
                overflow: hidden;
                img {
                  display: block;
                  max-width: 100%;
                  height: auto;
                }
              }
            }
          }
          > .hasnot-img {
            > p {
              padding: $padding;
            }
          }
        }
      }
    }
  }
}

@include mobile {
  .list {
    > ul {
      > li {
        > .cover {
          > .ad {
            > .has-img {
              > div.imgs {
                width: 100%;
                height: auto;
              }
              > .img-text {
                > div.text {
                  width: 100%;
                }
              }
            }
          }
        }
      }
    }
  }
}

@include breakpoint(768px, 999999px) {
  .list {
    > ul {
      > li {
        > .cover {
          > .ad {
            > .has-img {
              > .img-text {
                @include clearfix;
                > div.imgs {
                  float: left;
                  width: 50%;
                  height: calr(100%/2);
                }
                > div.text {
                  float: right;
                  width: 50%;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
