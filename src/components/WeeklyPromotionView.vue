<template>
    <!-- 本周强推组件 -->
    <div class="weeklyPromotion-item">
        <h4>{{ weeklyPromotion.name }}</h4>
        <div class="weekOne">
            <router-link :to="{ name: 'readingBooks', params: { id: weeklyPromotion ? weeklyPromotion.list[0].id : '' } }">
                <van-image class="BigImg" width="94" height="132"
                    :src="`${weeklyPromotion.list ? weeklyPromotion.list[0].cover : ''}`" />
            </router-link>
            <div class="title">
                <h5>{{ weeklyPromotion.list ? weeklyPromotion.list[0].title : '' }}</h5>
                <div class="autho"><span>{{ weeklyPromotion.list ? weeklyPromotion.list[0].author : '' }}</span> / <span>{{
                    weeklyPromotion.list ? weeklyPromotion.list[0].category : '' }}</span></div>
                <div class="content">{{ weeklyPromotion.list ? weeklyPromotion.list[0].content : '' }}</div>
            </div>
        </div>
        <!-- 四本书籍 -->
        <van-grid class="week-item">
            <van-grid-item v-for="i in weeklyPromotion.list ? weeklyPromotion.list.slice(1, 5) : ''" :key="i.id"
                :icon="`${i.cover}`" :text="`${i.title}\n ${i.author}`"
                :to="{ name: 'readingBooks', params: { id: i.id } }" />
        </van-grid>
    </div>
</template>
<script>

export default {
    props: ['weeklyPromotion'],
    data() {
        return {

        };
    },

}
</script>
  
<style lang="scss">
.weeklyPromotion-item {
    padding: 0 15px;
    box-sizing: border-box;
    text-align: left;

    h4 {
        margin: 6px;
    }

    .weekOne {
        display: flex;
        font-size: 12px;
        margin-bottom: 15px;

        .BigImg {
            flex-shrink: 0;
            margin-right: 5px;
        }

        h5 {
            font-size: 16px;
            margin-bottom: 6px;
        }

        .autho {
            margin-bottom: 10px;
        }

        .content {
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            display: -webkit-box;
            overflow: hidden;

        }

    }

    .week-item {
        img {
            width: 94%;
            height: 114px;
        }
    }

    .van-grid-item__content {
        padding: 0;
    }
}
</style>