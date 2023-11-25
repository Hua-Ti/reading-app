<template>
    <div class="sortBooks">
        <van-tabs v-model="active">
            <van-tab v-for="so in data" :key="so.name" :title="so.name">
                <van-sidebar v-model="activeKey">
                    <van-sidebar-item v-for="sub in so.subNavis" :key="sub.name" :title="sub.name"
                        @click="linkUrl(sub.naviInfos[0].url)" />
                </van-sidebar>
            </van-tab>
        </van-tabs>
        <div class="sortResult">
            <div v-for="(sd, index) in sortData" :key="sd.id">
                <router-link class="sortResult-list" :to="{ name: 'readingBooks', params: { id: sd.id } }">
                    <van-image width="56" height="80" :src="sd.cover" />
                    <div class="title">
                        <h5><span>{{ sd.title }}</span><span>{{ index + 1 }}</span></h5>
                        <p>{{ sd.content }}</p>
                        <div><span>{{ sd.author }}</span> / <span>{{ sd.category }}</span></div>
                    </div>
                </router-link>
            </div>

        </div>
    </div>
</template>
<script>
import { smallSortBook, smallSortData } from '../apis/sortBooks'
export default {
    props: ['id', 'name', 'url'],
    data() {
        return {
            active: 0,
            data: '',
            activeKey: 0,
            sortData: '',
            newUrl: '',
            list: [],
            loading: false,
            finished: false,
        }
    },
    methods: {
        async smallSortBook() {
            let { data } = await smallSortBook();
            this.data = data.list
            console.log('data', data.list)
        },
        async smallSortData(url) {
            let { data } = await smallSortData(url);
            this.sortData = data.list
            console.log('this.sortData', data.list)
        },
        linkUrl(url) {
            this.newUrl = url;
        },
    },
    mounted() {
        this.smallSortBook()
        this.smallSortData(this.url);
    },
    watch: {
        newUrl() {
            this.smallSortData(this.newUrl);
        }
    }
}
</script>
<style lang="scss">
.sortBooks {
    padding: 10px 15px;
    box-sizing: border-box;
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    min-height: 100vh;
    z-index: 1;
    background-color: aliceblue;

    .van-tab__pane {
        margin-top: 8px;
    }

    .sortResult {
        position: absolute;
        right: -59px;
        top: 57px;
        width: 91vw;
        height: 88vh;
        overflow: auto;

        .sortResult-list {
            display: flex;
            margin-bottom: 10px;
        }

        img {
            margin: 8px;
            flex-shrink: 1;
        }

        .title {
            color: #777;
            font-size: 12px;
            width: 55%;
            text-align: left;
            padding-left: 17px;
            margin-top: 8px;

        }

        h5 {
            color: #333;
            margin-bottom: 5px;
            font-size: 15px;
            font-weight: 500;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        h5>span:nth-child(1) {
            width: 75vw;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        h5>span:nth-child(2) {
            color: #777;
            font-size: 12px;
            margin-right: 10px;
        }

        .title p {
            width: 53vw;
            height: 14px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-bottom: 5px;
        }

    }
}
</style>