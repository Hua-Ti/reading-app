<template>
    <!-- 二级小图标组件 -->
    <div class="shortCut-item">
        <van-grid class="shortCut-list">
            <van-grid-item :to="{ name: 'rankNavi', params: { id: i.msgId, name: i.name, url: i.url } }" v-for="i in shortCut"
                :key="i.msgId" :icon="`${i.cover}`" :text="`${i.name}`" />
        </van-grid>
    </div>
</template>
<script>

export default {
    props: ['shortCut'],
    data() {
        return {

        };
    },
    mounted() {

    }

}
</script>
  
<style lang="scss">
.shortCut-item {
    width: 100%;
    padding: 0 15px;
    box-sizing: border-box;

    .shortCut-list {
        margin: 0 auto;
        display: flex;
        width: 70%;
        justify-content: space-between;
        flex-wrap: nowrap;
    }

    .van-grid-item__content {
        padding: 10px;
    }

    .van-grid-item__text {
        margin-top: 5px;
    }

}</style>