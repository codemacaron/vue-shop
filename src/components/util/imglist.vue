<template lang="pug">
  .img-list
    button.btn-prev(type="button" :class="{active : isPrevActive === 0}" @click="onClickImg('prev')") 이전
    button.btn-next(type="button" :class="{active : isNextActive === imgListIndex}" @click="onClickImg('next')") 다음
    ul
      li(v-for="(list, index) in imgList" )
        div(:class="{active : listIndex === index}")
          img(:src="list.src")
          .text
            h1 {{list.title}}
            p {{list.price}}원
            p {{list.content}}
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Join',
  data () {
    return {
      imgList: [
        {
          'src': 'https://ae01.alicdn.com/kf/HTB12s.bMVXXXXavXpXXq6xXFXXXz/rompers-jumpsuit-rompers-romper.jpg_640x640.jpg',
          'title': '크록스 여아용 110 팔아요',
          'content': 'Integer et commodo dui, quis bibendum leo. Nullam sed tristique neque. Phasellus interdum augue dolor. Integer fringilla pharetra odio, quis congue nunc efficitur in. Aliquam non odio et ante ultrices tincidunt. Donec ornare a lacus eu imperdiet. Donec ac purus nec libero auctor vestibulum posuere ut nulla. Nunc pulvinar ante vitae nulla dignissim, vel consequat lacus aliquet. Pellentesque ut purus mauris. Curabitur nec felis dignissim, convallis libero vitae, semper ipsum. Phasellus porta, magn',
          'price': '12000'
        },
        {
          'src': 'https://cooingkids.com/web/product/medium/201702/34545_shop1_781972.jpg',
          'title': '1세 아기용 옷 팔아요',
          'content': 'Aliquam non odio et ante ultrices tincidunt. Donec ornare a lacus eu imperdiet. Donec ac purus nec libero auctor vestibulum posuere ut nulla. Nunc pulvinar ante vitae nulla dignissim, vel consequat lacus aliquet. Pellentesque ut purus mauris. Curabitur nec felis dignissim, convallis libero vitae, semper ipsum. Phasellus porta, magn',
          'price': '25000'
        },
        {
          'src': 'http://sm-img2.wemep.co.kr/resize_460x460/seller/deal/1/967/3959671/07d9be12f2864d748814c9766637d294.jpg',
          'title': '2세 아기용 옷 팔아요',
          'content': 'Integer et commodo dui, quis bibendum leo. Nullam sed tristique neque. Phasellus interdum augue dolor. Integer fringilla pharetra odio, quis congue nunc efficitur in. Curabitur nec felis dignissim, convallis libero vitae, semper ipsum. Phasellus porta, magn',
          'price': '4000'
        },
        {
          'src': 'http://mblogthumb4.phinf.naver.net/MjAxNzEyMjZfNTAg/MDAxNTE0MjU0MTA1MTcw.Jq-V0aguiJFa5g35-dDAZHqUlr5APVL3h8F0ppvUxTQg.M4DdpKwBWFPbtNYxsS9Cos0m7pDV5zmsRvMg15pdhk0g.JPEG.misohanttam/6.jpg?type=w800',
          'title': '3세 아기용 옷 팔아요',
          'content': 'Integer et commodo dui, quis bibendum leo. Nullam sed tristique neque. Phasellus interdum augue dolor. Integer fringilla pharetra odio, quis congue nunc efficitur in.',
          'price': '10000'
        }

      ],
      listIndex: 0,
      isPrevActive: 0,
      isNextActive: null,
      imgListIndex: null
    }
  },
  computed: {
    ...mapGetters([
    ])
  },
  created () {
    this.ckeckIndex()
  },
  methods: {
    onClickImg (payload) {
      switch (payload) {
        case 'prev':
          if (this.listIndex === 0) {
            break
          }
          this.listIndex -= 1
          this.isPrevActive = this.listIndex
          this.isNextActive = this.listIndex
          break
        case 'next':
          if (this.listIndex === (this.imgList.length - 1)) {
            break
          }
          this.listIndex += 1
          this.isPrevActive = this.listIndex
          this.isNextActive = this.listIndex
          break
      }
    },
    ckeckIndex () {
      this.isNextActive = 0
      this.imgListIndex = this.imgList.length - 1
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./../../sass/partials/_fonts";
@import "./../../sass/partials/_color";
@import "./../../sass/partials/_mixin";
@import "./../../sass/partials/_base";
.img-list{
  position: relative;
  z-index: 0;
  overflow: hidden;
  width: 100%;
  height: 766px;
  button{
    position: absolute;
    top: 50%;
    width: 50px;
    height: 50px;
    z-index: 1;
    background: none;
    border: 0 none;
    text-indent: -9999px;
    &.active{
      opacity: 0.3;
    }
    &::after{
      font-family: 'FontAwesome';
      position: absolute;
      top: 0;
      left: 0;
      width: 50px;
      height: 50px;
      line-height: 50px;
      background: rgba(#fff, .7);
      border: $border;
      border-radius: 100%;
      text-indent: 0;
      font-size: 30px;
    }

    &.btn-prev{
      left: 10px;
      &::after{
        content: '\f104';
      }
    }
    &.btn-next{
      right: 10px;
      &::after{
        content: '\f105';
      }
    }
  }
  ul{
    @include clearfix;
    list-style: none;
    padding-left: 0;
    li{
      float: left;
      >div{
        position: relative;
        z-index: 0;
        display: none;
        &.active{
          display: block;
        }
        img{
          width: auto;
          height: 766px;
        }
        .text{
          position: absolute;
          bottom: 0;
          left: 0;
          background: rgba(#fff, .6);
          width: 612px;
          height: auto;
          padding: 20px;
          box-sizing: border-box;
        }
      }
    }
  }
}
</style>
