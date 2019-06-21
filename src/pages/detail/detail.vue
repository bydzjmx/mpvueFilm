<template>
  <div class="detailContainer">
    <img class="detail_header" :src="isMusicPlay?detailObj.music.coverImgUrl:detailObj.detail_img">
    <img @tap='handleMusicPlay' class="musicImg"
         :src="isMusicPlay?'/static/images/music/music-stop.png':'/static/images/music/music-start.png'">
    <div class="detail_author_date">
      <img :src="detailObj.avatar">
      <span>{{detailObj.author}}</span>
      <span>发布于</span>
      <span>{{detailObj.date}}</span>
    </div>
    <p class="detail_company">{{detailObj.title}}</p>
    <div class="detail_collection_share">
      <div class="col_share_img">
        <img @tap="handleCollection" :src="isCollected?'/static/images/icon/collection.png':'/static/images/icon/collection-anti.png'">
        <img @tap="handleShare" src="/static/images/icon/share-anti.png">
      </div>
      <div class="line"></div>
    </div>
    <button open-type="share">转发此文章</button>
    <p class="detail_content">{{detailObj.detail_content}}</p>
  </div>
</template>

<script>
  //获取数据
  import {mapState} from 'vuex'
  import index from '../../../src-demo/utils'
  import isPlayObj from '../../datas/isPlay'

  export default {
    name: 'detail',
    data(){
      return{
        detailObj:{},
        isCollected: false,  //是否收藏
        isMusicPlay: false   //标识音乐是否播放
      }
    },
    beforeMount(){
      console.log(this);
      //使用this获取下标
     this.index =  this.$mp.query.index;
      //预处理工作: 本地是否收藏的缓存
      let oldStorage = wx.getStorageSync('isCollected');
      if (!oldStorage) {
        wx.setStorage({
          key: 'isCollected',
          data: {}
        });
      } else {
        this.isCollected = (oldStorage[this.index]?true:false);
      }
      //判读当前页面加载的时候 音乐是否在播放
      if (isPlayObj.pageIndex === this.index && isPlayObj.isPlay) {
        this.isMusicPlay = true
      } else {
        this.isMusicPlay = false
      }

      //监听音乐的播放和暂停
      wx.onBackgroundAudioPlay(()=>{
        console.log("music start")
        this.isMusicPlay = true
        isPlayObj.pageIndex = this.index
        isPlayObj.isPlay = this.isMusicPlay
      });

      wx.onBackgroundAudioPause(()=>{
        console.log("music stop")
        this.isMusicPlay = false
        isPlayObj.pageIndex = this.index
        isPlayObj.isPlay = this.isMusicPlay
      })
    },
    mounted(){
      this.detailObj = this.listTmp[this.index];
    },
    computed:{
      //映射状态到本组件
      ...mapState(['listTmp'])
    },
    methods:{
      handleCollection(){
        //修改状态
        let isCollected = !this.isCollected;
        this.isCollected = isCollected;
        let title = isCollected?'收藏成功': '取消收藏';
        wx.showToast({
          title,
          icon: 'success'
        });

        //读取之前本地缓存状态查看是否收藏
        let oldStorage = wx.getStorageSync("isCollected");
        //oldStorage = {}
        oldStorage[this.index] = this.isCollected;
        //将本次设置结果缓存到本地
        wx.setStorage({
          key: 'isCollected',
          data: oldStorage
        })

      },
      handleMusicPlay(){
        //处理音乐播放
        let isMusicPlay = !this.isMusicPlay
        this.isMusicPlay = isMusicPlay
        let {dataUrl,title} = this.detailObj.music
        if(this.isMusicPlay){
          //播放音乐
          wx.playBackgroundAudio({
            dataUrl,
            title
          })
        }else {
          wx.pauseBackgroundAudio()
        }
      },
      handleShare(){
        wx.showActionSheet({
          itemList: ["分享到朋友圈","分享到微博","分享给微信好友"], //按钮的文字数组，数组长度最大为6个,
          itemColor: '#000000', //按钮的文字颜色,
          success: res => {}
        })
      }
    }
  }
</script>

<style scoped>
  .detailContainer {
    display: flex;
    flex-direction: column;
  }
  .detail_header{
    width:100%;
    height:460rpx;
  }

  .musicImg {
    width:60rpx;
    height:60rpx;
    position: absolute;
    left:50%;
    top:200rpx;
    margin-left: -30rpx;
  }

  .detail_author_date {
    padding:10rpx;
  }

  .detail_author_date img{
    width:64rpx;
    height:64rpx;
    border-radius: 32rpx;
    vertical-align: middle;
  }

  .detail_author_date span {
    font-size: 14px;
    vertical-align: middle;
    margin-left: 6px;
  }

  .detail_company {
    font-size: 32rpx;
    font-weight: bold;
    margin:10rpx;
  }

  .detail_collection_share{
    position: relative;
  }
  .col_share_img {
    float: right;
    margin-right: 30rpx;
  }

  .col_share_img img {
    width:60rpx;
    height:60rpx;
    margin-right:20rpx;
  }

  .line{
    /*position: absolute;*/
    top: 45rpx;
    left: 5%;
    width:90%;
    height: 2rpx;
    background: #eee;
    z-index:-1;
  }

  .detail_content {
    font-size: 38rpx;
    margin:10rpx;
  }
  button{
    font-size: 26rpx;
  }
</style>
