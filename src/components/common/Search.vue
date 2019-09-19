<template lang="pug">
  div.search-content
    i.el-icon-search.i-search(@click="trigger=true")
    el-dialog.search-bar(
      v-bind:visible.sync="trigger"
      v-bind:fullscreen="screenWidth < 768 ? true : false"
      v-bind:top="screenWidth < 768 ? '' : '0'"
      v-bind:show-close="false"
      v-bind:modal="false"
    )
      div.content-wrapper
        i.el-icon-close.i-close(@click="handleClose")
        el-input.input-search(placeholder="검색해보세요." v-model="input")
</template>

<script>
export default {
  props: ['screenWidth'],
  data () {
    return {
      input: '',
      trigger: false
    }
  },
  methods: {
    triggerBar () {
      this.triggerBar = true
    },
    handleClose () {
      this.trigger = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../sass/partials/mixin';

  i.i-search {
    font-size: 18px;
  }
  .content-wrapper {
    display: flex;
    align-items: center;
    i.i-close {
      order: 3;
      margin-right: 16px;
      font-size: 20px;
      cursor: pointer;
      @include tablet {
        margin-right: 0;
      }
      @include desktop {
        margin-right: 0;
      }
    }
  }
</style>
