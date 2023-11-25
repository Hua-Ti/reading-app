<template>
    <div>
        <!-- 免费 -->
        <!-- 好书专区 -->
        <GoodBooksView :goodBooksSection="goodBooksSection"/>
        <!-- 猜你喜欢 -->
        <PopularityView :Popularity="guessWhatYouLike" />
        <p class="footer">我也是有底线的 o(≧▽≦)o</p>
        <br><br><br>
    </div>
</template>
<script>
import PopularityView from '../../components/PopularityView.vue';
import GoodBooksView from '../../components/GoodBooksView.vue'
import { getBookMallSort } from '../../apis/BookMall';
export default {
    props: ['id', 'name', 'url'],
    components: {
        // 猜你喜欢
        PopularityView,
        // 好书专区
        GoodBooksView
    },
    data() {
        return {
            // 好书专区
            goodBooksSection: '',
            // 猜你喜欢
            guessWhatYouLike:''
        }
    },
    async mounted() {
        let { data } = await getBookMallSort(this.url);
        this.guessWhatYouLike = data.list[1];
        this.goodBooksSection=data.list[0];
        console.log('this.goodBooksSection', this.goodBooksSection);
    }
}
</script>
