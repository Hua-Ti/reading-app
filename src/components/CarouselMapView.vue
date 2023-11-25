<template>
  <!-- 轮播图组件 -->
  <div class="carouselMap-item">
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="pic in banners" :key="pic.id">
        <router-link :to="{name:'readingBooks',params:{id:pic.id}}">
          <img  class="pic-item" v-lazy="pic.cover" />
        </router-link>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>

export default {
  props: ['banners'],
  data() {
    return {
      
    };
  },
 
}
</script>

<style lang="scss">
.carouselMap-item{
  height: 158px;
  padding: 0 15px;
  box-sizing: border-box;
  .pic-item{
    width: calc(100vw - 30px);
    border-radius: 5px;
  }
 

}
</style>