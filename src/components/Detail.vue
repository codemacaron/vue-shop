<template lang="pug">
  main(v-cloak)
    div.cover
      div.post
        h1 {{post.title}}
        ul.info
          li
            strong No
            span {{post.no}}
          li
            strong 작성일
            span {{post.updated_at}}
          li
            strong 카테고리
            span(v-show="post.category_no === '1'") Apple
            span(v-show="post.category_no === '2'") Banana
            span(v-show="post.category_no === '3'") Coconut
          li
            strong 이메일
            span {{post.email}}
          li
            strong 댓글 수
            span(v-show="replies.length !== 0") {{replies.length}}
            span(v-show="replies.length === 0") 0
        div
          ul.img-text-area
            li(v-for="list, index in 4")
              .img-area
                span.index {{index + 1}} 번
                img(src="https://cooingkids.com/web/product/medium/201702/34545_shop1_781972.jpg")
              .text-area
                h1 제목 : {{post.email}}
                p 가격 : {{replies.length}} 원
                p 내용 : {{post.contents}}
        .btn-group
          button.btn-modify(type="button" @click="onClickRenderLink()") 수정하기
          button.btn-delete(type="button" @click="onClickRenderLink()") 삭제하기
          a.link-goto-list(@click="onClickRenderLink()") 목록으로 가기
      div.replies(v-show="replies.length !== 0")
        h1 댓글 {{replies.length}}개
        ul(v-for="(reply, index) in replies")
          li
            ul.info
              li
                strong 이메일
                span {{reply.email}}
              li
                strong 작성일
                span {{reply.updated_at}}
              li
                strong 작성자 No
                span {{reply.user_no}}
            p
              strong 내용
              span {{reply.contents}}
            button.btn-more(type="button") 댓글 더보기
            .re-reply
              h2 댓글의 댓글
              ul
                li
                  ul.info
                    li
                      strong 이메일
                      span {{reply.email}}
                    li
                      strong 작성일
                      span {{reply.updated_at}}
                    li
                      strong 작성자 No
                      span {{reply.user_no}}
                  p
                    strong 내용
                    span {{reply.contents}}
                li
                  ul.info
                    li
                      strong 이메일
                      span {{reply.email}}
                    li
                      strong 작성일
                      span {{reply.updated_at}}
                    li
                      strong 작성자 No
                      span {{reply.user_no}}
                  p
                    strong 내용
                    span {{reply.contents}}

    div.join
      h1.a11y-hidden 회원가입
      div.only-web
        p
          | 지금 가입하면 꿈꾸던 기업에 제직 중인 현직자와
          strong 익명
          | 으로 대화할 수 있습니다.
        p
          button.btn-join(type="button" @click="onClickJoinArea('open')") SNS계정으로 빠른 회원가입
          | 또는
          button.btn-login(type="button" @click="onClickLoginArea('open')") 로그인
      div.only-mobile
        p
          | 지금 가입하면 꿈꾸던 기업에 제직
          br
          | 중인 현직자와
          strong 익명
          | 으로 대화할 수 있습니다.
        button.btn-join-m(type="button" @click="onClickJoinArea('open')") 회원가입
    C-Join(v-show="getJoinArea")
    C-Login(v-show="getLoginArea")

</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import CLogin from './util/login'
import CJoin from './util/join'

export default {
  name: 'Detail',
  data () {
    return {
      join: false,
      no: '',
      post: '',
      replies: []
    }
  },
  components: {
    CLogin,
    CJoin
  },
  computed: {
    ...mapGetters([
      'getFilter',
      'getLoginArea',
      'getJoinArea'
    ])
  },
  methods: {
    onClickLoginArea (payload) {
      this.$store.dispatch('setLoginArea', payload)
    },
    onClickJoinArea (payload) {
      this.$store.dispatch('setJoinArea', payload)
    },
    // 동적 라우터 연결
    onClickRenderLink () {
      let payload = false
      this.$store.dispatch('setChangePage', payload)
      this.$router.push({ name: 'Main' })
    }
  },
  mounted () {
    this.no = this.$route.query.no
    let detailAPI = 'https://comento.cafe24.com/detail.php?req_no=' + this.no
    // detail 받아오기
    axios.get(detailAPI).then((response) => {
      this.post = response.data.detail.article
      this.replies = response.data.detail.replies
    }).catch(error => console.error('실행실패 ::: ', error.message))
  }
}

</script>

<style lang="scss" scoped>
@import "./../sass/partials/_fonts";
@import "./../sass/partials/_color";
@import "./../sass/partials/_mixin";
// 변수 모음
$height: 50px;
.cover {
  border-top: 2px solid $color-border;
  border-bottom: 2px solid $color-border;
  p {
    line-height: 30px;
    padding-left: 10px;
    $border: 10px;
  }
  strong {
    font-weight: bold;
    &::after {
      content: ":";
      display: inline-block;
      margin: 0 5px;
    }
  }
  .post {
    position: relative;
    padding: 0 0 100px 0;
    @include clearfix;
    > h1 {
      padding: 10px;
      margin-bottom: 10px;
      border-bottom: $border;
      font-size: $font-xl;
      font-weight: bold;
    }
    > ul {
      list-style: none;
      padding-bottom: 10px;
      padding-left: 10px;
      $border: 10px;
      margin-bottom: 10px;
      border-bottom: $border;
      li {
        font-size: $font-m;
        &:first-of-type {
          margin-left: 0;
        }
      }
    }
    .btn-group {
      position: absolute;
      bottom: 50px;
      right: 0;
    }
  }
  .img-text-area {
    @include clearfix;
    li{
      width: 49.5%;
      float: left;
      margin-top: 20px;
      border: 1px solid #dedfdf;
      box-sizing: border-box;
      &:nth-of-type(odd){
        margin-right: 1%;
      }
      .img-area{
        position: relative;
        width: 100%;
        height: 400px;
        background: red;
        padding: 0;
        overflow: hidden;
        .index{
          position: absolute;
          left: 0;
          top: 0;
          width: 50px;
          height: 50px;
          line-height: 50px;
          background: rgba($color: #fff, $alpha: .7);
          text-align: center;
        }
        img{
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: auto;
          height: 400px;
        }
      }
      .text-area{
        padding: 20px;
        border-top: 1px solid #dedfdf;
      }
    }
  }
  ul {
    list-style: none;
    padding-left: 0;
  }
  .replies {
    padding-bottom: 50px;
    margin-top: 50px;
    h1 {
      padding: 10px;
      margin-bottom: 10px;
      border-top: 2px solid $color-border;
      border-bottom: 2px solid $color-border;
      font-weight: bold;
      font-size: $font-m;
    }
    > ul {
      margin-bottom: 10px;
      > li {
        padding-top: 10px;
        margin-bottom: 20px;
        border-top: $border;
        border-bottom: $border;
      }
    }
    .re-reply{
      background: rgba($color: #dedfdf, $alpha: .1);
      h2{
        padding: 10px;
        margin-bottom: 10px;
        border-top: 1px solid $color-border;
        // border-bottom: 1px solid $color-border;
        font-weight: bold;
        font-size: $font-m;
      }
      > ul > li {
        position: relative;
        border-top: 1px solid #dedfdf;
        padding: 20px 40px 20px 20px;
        &::after{
          font-family: 'FontAwesome';
          content: "\f061";
          position: absolute;
          left: 10px;
          top: 20px;
        }
      }
    }
  }
}

ul.info {
  list-style: none;
  padding-left: 10px;
  $border: 10px;
  padding-bottom: 10px;
  border-bottom: $border;
  list-style: none;
  li {
    float: left;
    font-size: $font-m;
    padding-right: 20px;
  }
}

input[type="radio"] {
  position: relative;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    display: block;
    width: 20px;
    height: 20px;
    border: $border;
    border-radius: 100% 100%;
    background: #fff;
    font-size: $font-m;
    text-align: center;
    line-height: 25px;
    color: $color-point;
  }
  &:checked {
    &::before {
      content: "●";
    }
  }
}

.join {
  text-align: center;
  p {
    padding-top: 20px;
  }
}

@include mobile {
  .only-web {
    display: none;
  }
  // .cover {
  //   .post {
  //     > ul {
  //       > li {
  //         margin-top: 10px;
  //         &:first-of-type {
  //           margin-top: 0px;
  //         }
  //       }
  //     }
  //   }
  // }
  // .replies {
  //   > ul {
  //     > li {
  //       ul {
  //         li {
  //           margin-top: 10px;
  //           &:first-of-type {
  //             margin-top: 0px;
  //           }
  //         }
  //       }
  //     }
  //   }
  // }
  // .link-goto-list {
  //   bottom: 50px;
  //   left: 50%;
  //   transform: translateX(-50%);
  // }
}

@include breakpoint(768px, 999999px) {
  .only-mobile {
    display: none;
  }
  // .cover {
  //   .post {
  //     > ul {
  //       @include clearfix;
  //       > li {
  //         float: left;
  //         margin-left: 10px;
  //         &:first-of-type {
  //           &::before {
  //             content: "";
  //             margin-bottom: 0;
  //             display: inline-block;
  //             width: 0;
  //             height: 0;
  //             background: none;
  //             margin-right: 0;
  //           }
  //         }
  //         &::before {
  //           content: "";
  //           margin-bottom: -3px;
  //           display: inline-block;
  //           width: 1px;
  //           height: 15px;
  //           background: #dedfdf;
  //           margin-right: 10px;
  //         }
  //       }
  //     }
  //   }
  // }
  // .replies {
  //   > ul {
  //     > li {
  //       ul {
  //         @include clearfix;
  //         li {
  //           float: left;
  //           margin-left: 10px;
  //           &:first-of-type {
  //             margin-left: 0;
  //           }
  //         }
  //       }
  //     }
  //   }
  // }
}
</style>
