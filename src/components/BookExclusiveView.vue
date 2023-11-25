<template>
    <!-- 新书独家组件 -->
    <div class="bookExclusive-item">
        <h4>{{ bookExclusive.name }}</h4>
        <!-- 四本书籍 -->
        <van-grid class="week-item">
            <van-grid-item v-for="i in bookExclusive.list ? bookExclusive.list : ''" :key="i.id" :icon="`${i.cover}`"
                :text="`${i.title}\n ${i.author}`" :to="{ name: 'readingBooks', params: { id: i.id } }" />
        </van-grid>
    </div>
</template>
<script>

export default {
    props: ['bookExclusive'],
    data() {
        return {

        };
    },

}
</script>
  
<style lang="scss">
.bookExclusive-item {
    padding: 0 15px;
    box-sizing: border-box;
    text-align: left;

    h4 {
        margin: 6px;
    }

    .week-item {
        img {
            width: 94%;
            height: 113px;
        }
    }

    .van-grid-item__content {
        padding: 0;
    }

    .van-grid-item__text {
        height: 36px;
        overflow: hidden;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        word-wrap: break-word;
        word-break: break-all;

    }
}
</style>