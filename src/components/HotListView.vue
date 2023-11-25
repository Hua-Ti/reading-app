<template>
    <!-- 24小时热销榜组件 -->
    <div class="HotList-item">
        <h4>{{ HotList.name }}</h4>
        <div class="HotList">
            <van-grid :column-num="3" gutter="5px" :border=false>
                <van-grid-item :to="{ name: 'readingBooks', params: { id: h.id } }" v-for="h in HotList.list" :key="h.id"
                    :icon="h.cover" :text="h.title" />
            </van-grid>
        </div>
        <router-link class="more" :to="{ name: 'rankNavi' }">查看榜单 &gt;</router-link>
    </div>
</template>
<script>

export default {
    props: ['HotList'],
    data() {
        return {

        };
    },

}
</script>
  
<style lang="scss">
.HotList-item {
    padding: 0 15px;
    box-sizing: border-box;
    text-align: left;
    margin-bottom: 15px;

    h4 {
        margin: 6px;
        margin-top: 10px;
    }

    .van-icon__image {
        width: 100%;
        height: 151px;
        padding: 0;
    }
    .van-grid-item__text{
        height:36px;
        overflow: hidden;
    }

    .van-grid-item__content {
        padding: 16px 0 12px 0;
    }
    .HotList img{
        width: 108.39px;
        height:144px;
    }

    .more {
        text-align: center;
        font-size: 12px;
        color: #ccc;
    }


}
</style>