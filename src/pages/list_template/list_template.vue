<template>
    <div class="tmpContainer"  @tap="toDetail"> <!--分成五部分开发,头像,日期,详情图片,文字,点赞和观看数-->
      <div class="avatar_data">
        <img :src="item.avatar"/>
        <span>{{item.date}}</span>
      </div>
      <p class="company">
        {{item.title}}
      </p>
      <img :src="item.detail_img" class="detail_img">
      <p class="content">{{item.detail_content}}</p>
      <div class="view_star_container">
        <img src="/static/images/icon/star.png">
        <span>{{item.love_count}}</span>
        <img src="/static/images/icon/view.png">
        <span>{{item.attention_count}}</span>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'list_template',
    //接收传递过来的item参数
    props:[
      'item','index'
    ],
    methods:{
      toDetail(){
        //跳转到详情页
        wx.navigateTo({
          url:'/pages/detail/main?index=' +this.index
        })
      }
    }
  }
</script>

<style scoped>
  .tmpContainer{
    display: flex;
    flex-direction: column;
    border-bottom: 1rpx solid #eee;
  }
  .avatar_data{
    padding: 5rpx;
    margin-top: 5rpx;
  }
  .avatar_data img{
    width: 60rpx;
    height: 60rpx;
    vertical-align: middle;
    margin-right: 10rpx;
  }
  .avatar_data span{
    font-size: 28rpx;
    color: #333;
  }
  .company{
    padding: 10rpx;
    font-size: 36rpx;
    font-weight: bold;
  }
  .detail_img{
    height: 460rpx;
    width: 100%;
  }
  .content{
    font-size: 32rpx;
    text-indent: 32rpx;
    letter-spacing: 3rpx;
    line-height: 50rpx;
  }
  .view_star_container img{
    width: 32rpx;
    height: 32rpx;
    vertical-align: middle;
    margin-left: 10rpx;
  }
  .view_star_container span{
    font-size: 28rpx;
    color: #333;
    margin-left: 10rpx;
  }

</style>
