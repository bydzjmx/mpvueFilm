<template>
  <div class="infoContainer">
    <!--{{ msg }}-->
    <br/><br/><br/>
    <button v-if="!isShow"
            open-type="getUserInfo"
            lang="zh_CN"
            @getuserinfo="onGotUserInfo">点击登录
    </button>
    <div class="indexContainer"
         v-else>

      <img class="index_img"
           :src="userInfo.avatarUrl"
           alt=""/>
      <div style="text-align: center;">{{ userInfo.nickName }}</div>
      <br/><br/>
      <button @tap="toDetail" class="btn">进入电影小助手</button>
    </div>

  </div>
</template>

<script>
  export default {
    data(){
      return{
        userInfo:{},   //获取用户信息
        isShow: false     //用户没有授权
      }
    },
    onLoad(){
      console.log("------onLoad---------")
    },
    beforeMount(){
      console.log("------beforeMount---------")
      this.handleGetUserInfo();
    },
    mounted(){
      console.log("------mounted---------")
    },
    methods: {
      handleGetUserInfo(){
        //获取用户信息
        wx.getUserInfo({
          success: (data)=>{
            console.log(data);
            //获取成功,赋值给数据
            this.userInfo = data.userInfo;
            this.isShow = true;
          },
          fail: () =>{
            console.log("获取用户信息失败,请登录");
            this.isShow = false;
          }
        })
      },
      getUserInfo(data){
        //判断用户是否点击允许
        console.log(data);
        if(data.mp.detail.rawData){
          //用户授权
          this.handleGetUserInfo();
        }
      },
      toDetail(){
        console.log("toDetail");
        wx.switchTab({
          url: '/pages/list/main'
        })
      }
    }
  }

</script>

<style>
  page{
    background-image: url("https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3958128306,1203915770&fm=26&gp=0.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    -moz-background-size:100% 100%;
  }
  .infoContainer{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .index_img {
    width: 200rpx;
    height: 200rpx;
    border-radius: 100rpx !important;
    margin: 100rpx 0;
  }

  .indexContainer{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .btn{
    margin-top: 20rpx;
  }


</style>
