<template>
    <div class="listenToABook">
        <!-- 听书 -->
        <!-- 轮播图 -->
        <div class="carouselMap">
            <CarouselMapView :banners="banners" />
        </div>
        <!-- 一张图片 -->
        <div class="OnePictureView">
            <OnePictureView :onepicture="onepicture" />
        </div>
        <!-- 女生精选 -->
        <BookExclusiveView :bookExclusive="girlsChoice" />
        <p class="footer">我也是有底线的 o(≧▽≦)o</p>
        <br><br><br>

    </div>
</template>

<script>
import CarouselMapView from '../../components/CarouselMapView.vue'
import OnePictureView from '../../components/OnePictureView.vue'
import BookExclusiveView from '../../components/BookExclusiveView.vue'

import { getBookMallSort } from '../../apis/BookMall';
export default {
    props: ['id', 'name', 'url'],
    components: {
        CarouselMapView,
        OnePictureView,
        // 女生精选
        BookExclusiveView,
    },
    data() {
        return {
            // 轮播图
            banners: '',
            // 一张图片
            onepicture: '',
            // 女生精选
            girlsChoice: ''

        }
    },
    async mounted() {
        let { data } = await getBookMallSort(this.url);
        this.banners = data.list[0].banners;
        this.onepicture = data.list[1];
        this.girlsChoice = data.list[2];

        // console.log('banners', this.banners)
    }

}
</script>
<style lang="scss">
.listenToABook {
    .OnePictureView {
        margin-top: 10px
    }

  

}
</style>