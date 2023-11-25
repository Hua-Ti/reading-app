<template>
    <div>
       <!-- 男生 -->
       <PopularityView :Popularity="heavyRecommendation"/>
       <PopularityView :Popularity="weeklyHotArticle"/>
       <PopularityView :Popularity="readersLove"/>
       <HotListView :HotList="peopleSList"/>
       <PopularityView :Popularity="Recommendation"/>
       <HotListView :HotList="finalRanking"/>
       <p class="footer">我也是有底线的 o(≧▽≦)o</p>
        <br><br><br>
    </div>
</template>

<script>
import PopularityView from '../../components/PopularityView.vue'
import HotListView from '../../components/HotListView.vue'

import { getBookMallSort } from '../../apis/BookMall';
export default {
    props: ['id', 'name', 'url'],
    components:{
        PopularityView,
        HotListView
    },
    data(){
        return {
            // 重磅推荐
            heavyRecommendation:'',
            // 一周热文
            weeklyHotArticle:'',
            // 读者喜爱
            readersLove:'',
            // 人物风云榜
            peopleSList:'',
            // 口碑力荐
            Recommendation:'',
            // 完结榜
            finalRanking:'',

        }
    },
    async mounted() {
        let { data } = await getBookMallSort(this.url);

        this.heavyRecommendation = data.list[0];
        this.weeklyHotArticle = data.list[1];
        this.readersLove = data.list[2];
        this.peopleSList=data.list[3];
        this.Recommendation = data.list[4];
        this.finalRanking = data.list[5];
     
    }
}
</script>

