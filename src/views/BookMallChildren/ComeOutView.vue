<template>
    <div class="comeOut">
        <!-- 出版 -->
        <!-- 轮播图 -->
        <div class="carouselMap">
            <CarouselMapView :banners="banners" />
        </div>
        <!-- 二级分类菜单 -->
        <ShortCutView :shortCut="shortCut" />
        <!-- 分割线 -->
        <span class="partingLine"></span>
        <!-- 本周人气榜单 -->
        <HotListView :HotList="HotList" />
        <!-- 分割线 -->
        <span class="partingLine"></span>
        <!-- 精品小说 -->
        <PopularityView :Popularity="fineNovel" />
        <!-- 一张图片 -->
        <div class="OnePictureView">
            <OnePictureView :onepicture="onepicture" />
        </div>
        <!-- 青春言情 -->
        <BookExclusiveView :bookExclusive="romanceOfYouth" />
        <!-- 最后一张图片 -->
        <div class="OnePictureView">
            <OnePictureView :onepicture="onepictureTow" />
        </div>
         <!-- 分割线 -->
         <span class="partingLine"></span>
        <p class="footer">我也是有底线的 o(≧▽≦)o</p>
        <br><br><br>
    </div>
</template>

<script>
import CarouselMapView from '../../components/CarouselMapView.vue'
import ShortCutView from '../../components/ShortCutView.vue';
import HotListView from '../../components/HotListView.vue'
import PopularityView from '../../components/PopularityView.vue'
import BookExclusiveView from '../../components/BookExclusiveView.vue'
import OnePictureView from '../../components/OnePictureView.vue'

import { getBookMallSort } from '../../apis/BookMall';
export default {
    props: ['id', 'name', 'url'],
    components: {
        CarouselMapView,
        // 二级分类菜单
        ShortCutView,
        // 本周人气榜单
        HotListView,
        // 精品小说
        PopularityView,
        // 青春言情
        BookExclusiveView,
        // 一张图片
        OnePictureView,
    },
    data() {
        return {
            // 轮播图
            banners: '',
            // 二级分类菜单
            shortCut: '',
            // 本周人气榜单
            HotList: '',
            //精品小说
            fineNovel: '',
            // 一张图片
            onepicture: '',
            // 青春言情
            romanceOfYouth: '',
            //最后一张图片
            onepictureTow: '',
        }
    },
    async mounted() {
        let { data } = await getBookMallSort(this.url);
        this.banners = data.list[0].banners;
        this.shortCut = data.list[1].shortCut;
        this.HotList = data.list[2];
        this.fineNovel = data.list[3];
        this.onepicture = data.list[4];
        this.romanceOfYouth = data.list[5];
        this.onepictureTow = data.list[6];

        console.log('banners', this.banners)
    }

}
</script>

