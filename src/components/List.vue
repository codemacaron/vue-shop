<template lang="pug">
  #list
    ul
      li(v-for="i in 10")
        a(href="#")
          .thumb
            img(src="https://images.unsplash.com/photo-1510130387422-82bed34b37e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80")
            button.cart(type="cart") 장바구니
            p.sale.sale10
              em save
              strong 20%
          .info
            h1 [기획상품] One-Frozen 노르웨이 고등어
            p.cost
              span.dc 2,500원
              span.emph →
              span.price 2,000원
            p.text 촉촉함이 남다른 한정판 고등어
    c-pagination

</template>

<script>
import CPagination from './../components/common/pagination'
export default {
  name: 'List',
  methods: {},
  components: { CPagination }
}
</script>

<style lang="scss" scoped>
@import "./../sass/App";
#list {
  ul {
    width: 960px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    li {
      width: 300px;
      height: 611px;
      margin-top: 25px;
      margin-right: 30px;
      &:nth-of-type(3n) {
        margin-right: 0;
      }
      a {
        display: block;
        width: 300px;
        text-decoration: unset;
        .thumb {
          position: relative;
          height: 396px;
          border: 1px solid #cfcfcf;
          background: #f9f8f9;
          img {
            width: 100%;
          }
          .cart {
            position: absolute;
            bottom: 10px;
            right: 10px;
            display: block;
            overflow: hidden;
            width: 45px;
            height: 45px;
            border: 0 none;
            text-indent: -10000%;
            font-size: 1px;
            background: url("https://res.kurly.com/pc/etc/old/images/common/cart-add-button_type2.png")
              no-repeat 50% 50%;
          }
          .sale {
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            flex-flow: column;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            width: 70px;
            height: 70px;
            background: $color-point;
            em,
            strong {
              display: block;
              text-align: center;
            }
            em {
              font-style: italic;
              font-size: 23px;
              font-weight: 100;
              color: rgba(#fff, 0.8);
            }
            strong {
              font-size: 23px;
              color: #fff;
            }
          }
        }
        .info {
          padding: 10px;
          h1 {
            font-weight: 700;
            font-size: 20px;
            color: #4c4c4c;
            line-height: 29px;
            margin: 0;
          }
          .cost {
            padding-top: 9px;
            font-size: 17px;
            line-height: 24px;
            font-weight: 700;
            color: $color-point;
            .dc {
              font-weight: 700;
              color: #999;
              text-decoration: line-through;
            }
            .emph {
              font-weight: 700;
              color: $color-point;
              padding: 0 5px;
            }
            .price {
              font-weight: 700;
              color: $color-point;
            }
          }
          .text {
            padding-top: 8px;
            font-size: 13px;
            color: #4c4c4c;
            line-height: 19px;
          }
        }
      }
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
