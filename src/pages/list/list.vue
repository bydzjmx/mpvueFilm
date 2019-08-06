<template>
  <div>
    <swiper class="swiper" indicator-dots indicator-color="pink" indicator-active-color="green">
      <swiper-item>
        <image src="/static/images/detail/carousel/04.png"/>
      </swiper-item>
      <swiper-item>
        <image src="/static/images/detail/carousel/02.jpg"/>
      </swiper-item>
      <swiper-item>
        <image src="/static/images/detail/carousel/03.jpg"/>
      </swiper-item>
      <swiper-item>
        <image src="/static/images/detail/carousel/01.jpg"/>
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
  .swiper{
    height: 376rpx;
  }
  image{
    height: 100%;
    width: 100%;
  }
</style>
