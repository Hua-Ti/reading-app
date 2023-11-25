<template>
    <div>
        <!-- 轮播图 -->
        <div class="carouselMap">
            <CarouselMapView :banners="banners" />
        </div>
        <!-- 分类 -->
        <ShortCutView :shortCut="shortCut" />
        <!-- 分割线 -->
        <span class="partingLine"></span>
        <!-- 本周强推 -->
        <WeeklyPromotionView :weeklyPromotion="weeklyPromotion" />
         <!-- 分割线 -->
         <span class="partingLine"></span>
        <!-- 人气NO.1 -->
        <PopularityView :Popularity="Popularity" />
        <!-- 分割线 -->
        <span class="partingLine"></span>
        <!-- 24小时热销榜 -->
        <HotListView :HotList="HotList" />
        <!-- 分割线 -->
        <span class="partingLine"></span>
        <!-- 精品必读 -->
        <PopularityView :Popularity="mustRead" />
        <!-- 分割线 -->
        <span class="partingLine"></span>
        <!-- 高能剧情 -->
        <PopularityView :Popularity="highPoweredDrama" />
        <!-- 分割线 -->
        <span class="partingLine"></span>
        <!-- 完结榜 -->
        <HotListView :HotList="completed" />
        <!-- 分割线 -->
        <span class="partingLine"></span>
        <!-- 优质好文 -->
        <PopularityView :Popularity="goodWriting" />
        <span class="partingLine"></span>
        <!-- 大家都在看 -->
        <PopularityView :Popularity="sWatching" />
        <p class="footer">我也是有底线的 o(≧▽≦)o</p>
        <br><br><br>
    </div>
</template>

<script>
import CarouselMapView from '../../components/CarouselMapView.vue';
import ShortCutView from '../../components/ShortCutView.vue';
import WeeklyPromotionView from '../../components/WeeklyPromotionView.vue';
import PopularityView from '../../components/PopularityView.vue'
import HotListView from '../../components/HotListView.vue'

import { getBookMallSort } from '../../apis/BookMall';
// , getBookMallSex
export default {
    props: ['id', 'name', 'url'],
    components: {
        // 轮播图
        CarouselMapView,
        // 二级小图标
        ShortCutView,
        // 本周强推
        WeeklyPromotionView,
        //人气NO.1
        PopularityView,
        // 24小时热销榜
        HotListView
    },
    data() {
        return {
            // 轮播图数据
            banners: '',
            // 二级分类
            shortCut: '',
            // 本周强推
            weeklyPromotion: '',
            //人气NO.1
            Popularity: '',
            //24小时热销榜
            HotList: '',
            // 精品必读
            mustRead: '',
            // 高能剧情
            highPoweredDrama: '',
            //完结榜
            completed: '',
            // 优质好文
            goodWriting: '',
            // 大家都在看
            sWatching: '',
            // 默认精选url
            defaultUrl: '%2Fstore%2Fshow.json%3Ftype=recommend&uuid=f2cb32ff209f4010911a77a617add8c4'
        }
    },
    methods: {
        async getBookMallSort() {
            console.log('请求数据开始');
            let  data  = await getBookMallSort(this.url == undefined ? this.defaultUrl : this.url);
            console.log('请求数据结束', data);
            if(data.code==404){
                console.log('请求数据失败');
            }
            data=data.data
            if (data) {
                this.banners = data.list[0].banners;
                this.shortCut = data.list[1].shortCut;
                this.weeklyPromotion = data.list[2];
                this.Popularity = data.list[3];
                this.HotList = data.list[4];
                this.mustRead = data.list[5];
                this.highPoweredDrama = data.list[6];
                this.completed = data.list[7];
                this.goodWriting = data.list[8];
                this.sWatching = data.list[9];
            }

        }
    },
    mounted() {
        this.getBookMallSort();
    }


}
</script>

<style lang="scss">
.partingLine {
    width: 92%;
    box-sizing: border-box;
    display: block;
    height: 1px;
    background-color: #e7e4e4;
    margin: 12px 0 15px 12px;
}
</style>