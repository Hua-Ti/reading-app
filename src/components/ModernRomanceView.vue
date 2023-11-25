<template>
    <!-- 现代言情组件 -->
    <div class="modernRomance-item">
        <h4>{{ modernRomance.name }}</h4>
        <div class="modernRomance">
            <van-grid direction="horizontal" :column-num="2">
                <van-grid-item  v-for="m in modernRomance.list" :key="m.id">
                    <router-link class="modernRomance-list" :to="{ name: 'readingBooks', params: { id: m.id } }">
                        <img :src="m.cover" alt="暂无图片">
                        <div class="title">
                            <h6>{{ m.title }}</h6>
                            <p>{{ m.category }}</p>
                            <div class="clickVolume">
                                <van-icon name="eye" />
                                <span>{{ Math.ceil(m.clickCount / 1000) / 10 }}</span>万
                            </div>
                        </div>
                    </router-link>
                </van-grid-item>
            </van-grid>
        </div>
    </div>
</template>
<script>

export default {
    props: ['modernRomance'],
    data() {
        return {

        };
    },

}
</script>
  
<style lang="scss">
.modernRomance-item {
    padding: 0 15px;
    box-sizing: border-box;
    text-align: left;
    margin-bottom: 10px;

    h4 {
        margin: 6px;
        margin-top: 10px;
        text-align: left;
    }

    .van-icon__image {
        width: 3em;
        height: auto;
    }

    .van-grid-item__content {
        padding: 10px 0;
    }
    .modernRomance-list{
        display: flex;
        align-items: center;
    }

    .modernRomance-list img {
        width: 18vw;
        background-color: rgb(232, 232, 232);
        height: 90.03px;
        text-align: left;
        vertical-align: top;
        color: white;
    }

    .title {
        width: 26vw;
        padding-left: 5px;
        box-sizing: border-box;
        margin-top: -10px;
        color:#777;

        p {
            font-size: 12px;
            margin: 8px 0 12px 0;
        }
    }

    .clickVolume {
        font-size: 12px;
        color: #ccc;

        &>span {
            color: #9a9898;
            margin-left: 3px;
        }
    }


}
</style>