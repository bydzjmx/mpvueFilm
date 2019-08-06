<template>
  <div >
  <div @tap="toMovieDetail(index)" class="movieContainer" v-for="(item,index) in moviesArr" :key="index">
    <img class="movie_img" :src="item.images.large">
    <div class="movie_info">
      <p class="movie_name">{{item.original_title}}</p>
      <p class="movie_year">{{item.year}}</p>
      <p class="movie_dir">{{item.directors[0].name}}</p>
    </div>
    <p class="movie_rating">{{item.rating.average}}</p>
  </div>
  </div>
</template>

<script>
  //暂取前100个数据
  const MOVIE_RUL = 'http://t.yushu.im/v2/movie/top250?count=100'
  export default {
    name: 'movie',
    data(){
      return{
        moviesArr: []
      }
    },
    beforeMount(){
      //fly
      this.$fly.get(MOVIE_RUL)
        .then((response) =>{
          console.log(response);
          let moviesArr = response.data.subjects;
          console.log(moviesArr);
          //分发action
          this.$store.dispatch('getMoviesArr',moviesArr)
          this.moviesArr = moviesArr;
        })
        .catch((error)=> {
          console.log(error);
        });
    },
    methods:{
      toMovieDetail(index){
        wx.navigateTo({  //将index传递过去
          url: '/pages/movieDetail/main?index=' + index  //在this.$mp.query.index中会有该值
        })
      }
    }
  }
</script>

<style scoped>
  .movieContainer{
    display: flex;
    flex-direction: row;
    border-bottom: 1rpx solid #eee;
  }
  .movie_img{
    width: 128rpx;
    height: 128rpx;
    margin-right: 20rpx;
  }
  .movie_info{
    width: 70%;
  }
  .movie_name{
    font-size: 32rpx;
    color: #333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .movie_year{
    font-size: 28rpx;
    color: #999;
    margin: 5rpx 0;
  }
  .movie_dir{
    font-size: 30rpx;
    color: #666;
  }

  .movie_rating{
    font-size: 36rpx;
    font-weight: bold;
    color: red;
  }
</style>
