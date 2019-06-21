<template>
  <div  class="listContainer">
    <swiper indicator-dots indicator-color="pink" indicator-active-color="green">
      <swiper-item>
        <img src="/static/images/detail/carousel/01.jpg">
      </swiper-item>
      <swiper-item>
        <img src="/static/images/detail/carousel/02.jpg">
      </swiper-item>
      <swiper-item>
        <img src="/static/images/detail/carousel/03.jpg">
      </swiper-item>
      <swiper-item>
        <img src="/static/images/detail/carousel/04.jpg">
      </swiper-item>
    </swiper>
    <div>
      <ListTmp v-for="(item,index) in listTmp" :key="index" :item="item" :index="index"></ListTmp>
    </div>
  </div>

</template>

<script>
  import {mapState} from 'vuex'
  import ListTmp from "../list_template/list_template"
  export default {
    components: {ListTmp},
    beforeMount(){
      //分发action修改状态
      this.$store.dispatch('getList')
    },
    computed:{
      //映射状态到本组件
      ...mapState(['listTmp'])
    }
  }
</script>

<style>
  .listContainer swiper{
    width: 100%;
    height: 400rpx;
  }
  .listContainer swiper item{
    width: 100%;
    height: 100%;
  }
</style>
