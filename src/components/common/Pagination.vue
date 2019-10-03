<template lang="pug">
  .pagination
    button.page-first(type="button") 맨 처음 페이지로 가기
    button.page-prev(type="button") 이전 페이지로 가기
    ul
      li(v-for="i in 9")
        a.page-num(href="#") {{ i }}
      li
        a.page-num.active(href="#") 10
    button.page-next(type="button") 다음 페이지로 가기
    button.page-last(type="button") 맨 끝 페이지로 가기

</template>

<script>
export default {
  name: 'CPagination',
  methods: {}
}
</script>

<style lang="scss">
@import "./../../sass/App";
.pagination {
  display: flex;
  justify-content: center;
  ul {
    display: flex;
    li {
      a {
        display: block;
      }
    }
  }
  [class^="page-"] {
    display: inline-block;
    width: 34px;
    height: 34px;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    border-right: 1px solid #ddd;
    border-left: 0 none;
    background: #fff;
  }
  .page-first {
    border-left: 1px solid #ddd;
    background-image: url("https://res.kurly.com/pc/etc/old/images/common/icon-pagination-first.png");
  }
  .page-prev {
    background-image: url("https://res.kurly.com/pc/etc/old/images/common/icon-pagination-prev.png");
  }
  .page-next {
    background-image: url("https://res.kurly.com/pc/etc/old/images/common/icon-pagination-next.png");
  }
  .page-last {
    background-image: url("https://res.kurly.com/pc/etc/old/images/common/icon-pagination-last.png");
  }
  .page-first,
  .page-prev,
  .page-next,
  .page-last {
    text-indent: -9999px;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    &:hover{
      background-color: #f7f5f8;
    }
  }
  .page-num {
    text-align: center;
    line-height: 34px;
    text-decoration: unset;
    color: #737373;
    &.active,
    &:hover {
      background: #f7f5f8;
      color: $color-point;
    }
  }
}
@include mobile {
}

@include tablet {
}

@include desktop {
}
</style>
