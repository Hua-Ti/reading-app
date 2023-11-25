<template>
    <div class="schoolgirl">
        <!-- 女生 -->
        <!-- 轮播图 -->
        <div class="carouselMap">
            <CarouselMapView :banners="banners" />
        </div>
        <!-- 小编力荐 -->
        <PopularityView :Popularity="smallSerRecommend" />
        <!-- 连载追更 -->
        <PopularityView :Popularity="serialChase" />
        <!-- 24小时人气榜 -->
        <HotListView :HotList="HoursPopularList" />
        <!-- 完本畅读 -->
        <PopularityView :Popularity="finishTheBookAndReadIt" />
        <!-- 分割线 -->
        <span class="partingLine"></span>
        <!-- 新书独家 -->
        <BookExclusiveView :bookExclusive="bookExclusive" />
        <!-- 分割线 -->
        <span class="partingLine"></span>
        <!-- 潜力IP -->
        <BookExclusiveView :bookExclusive="potentialIP" />
        <!-- 女生完结榜 -->
        <HotListView :HotList="girlsFinalList" />
        <!-- 分割线 -->
        <span class="partingLine"></span>
        <!-- 现代言情 -->
        <ModernRomanceView :modernRomance="modernRomance" />
        <!-- 分割线 -->
        <span class="partingLine"></span>
        <!-- 古代言情 -->
        <ModernRomanceView :modernRomance="ancientLove" />

        <p class="footer">我也是有底线的 o(≧▽≦)o</p>
        <br><br><br>

    </div>
</template>

<script>
import CarouselMapView from '../../components/CarouselMapView.vue'
import PopularityView from '../../components/PopularityView.vue'
import HotListView from '../../components/HotListView.vue'
import BookExclusiveView from '../../components/BookExclusiveView.vue'
import ModernRomanceView from '../../components/ModernRomanceView.vue'

import { getBookMallSort } from '../../apis/BookMall';
export default {
    props: ['id', 'name', 'url'],
    components: {
        CarouselMapView,
        PopularityView,
        HotListView,
        // 新书独家
        BookExclusiveView,
        // 现代言情 ，古代言情
        ModernRomanceView,
    },
    data() {
        return {
            // 轮播图
            banners: '',
            // 小编力荐
            smallSerRecommend: '',
            // 连载追更
            serialChase: '',
            // 24小时人气榜
            HoursPopularList: '',
            // 完本畅读
            finishTheBookAndReadIt: '',
            // 新书独家
            bookExclusive: '',
            // 潜力IP
            potentialIP: '',
            // 女生完结榜
            girlsFinalList: '',
            // 现代言情
            modernRomance: '',
            // 古代言情
            ancientLove: '',
        }
    },
    async mounted() {
        let { data } = await getBookMallSort(this.url);
        this.banners = data.list[0].banners;
        this.smallSerRecommend = data.list[1];
        this.serialChase = data.list[2];
        this.HoursPopularList = data.list[3];
        this.finishTheBookAndReadIt = data.list[4];
        this.bookExclusive = data.list[5];
        this.potentialIP = data.list[6];
        this.girlsFinalList = data.list[7];
        this.modernRomance = data.list[8];
        this.ancientLove = data.list[9];

        console.log('banners', this.banners)
    }

}
</script>
<style lang="scss">
.schoolgirl {
    .partingLine {
        width: 92%;
        box-sizing: border-box;
        display: block;
        height: 1px;
        background-color: #e7e4e4;
        margin: 12px 0 15px 12px;
    }



}
</style>