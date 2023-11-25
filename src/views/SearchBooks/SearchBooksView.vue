<template>
    <div class="search-item" :style="{ height: `${heightList}` }" v-show="changeShowHide">
        <!-- 搜索 -->
        <form action="/">
            <van-search v-model.trim="value" show-action placeholder="请输入搜索关键词" @input="searchAdvice(value)"
                @cancel="onCancel" shape="round" @blur="searchResult(value)" @focus="reveal = false" autofocus=true />
        </form>
        <div class="hotsearch-list" v-show="!value">
            <p>热门搜索</p>
            <div class="hot-list">
                <div v-for="i in list" :key="i.id">
                    <router-link class="hot-search-list" :to="{ name: 'readingBooks', params: { id: i.id } }">
                        <span class="hot-search">{{ list.length - i.hot }}</span>{{ i.name }}
                    </router-link>
                </div>
            </div>
            <div class="history" v-show="searchHistoryList != null">
                <div class="recentSearch"><span>最近搜索</span> <van-icon class="deleteHis" @click="removeHistory()"
                        name="delete-o" /></div>
                <span v-show="s" class="history-list" v-for="s in searchHistoryList" :key="s" @click="searchS(s)">
                    <van-icon name="search" /> {{ s }}
                </span>
            </div>
        </div>
        <!-- 推荐搜索 -->
        <div v-show="value && !reveal" class="result">
            <p @click="searchValue(value)"><van-icon name="search" /> 搜索 "{{ value }}"</p>
            <div @click="searchValue(w.text)" v-for="w in words" :key="w.id">
                <div v-if="w.showDetail" class="weekOne">
                    <van-image class="BigImg" width="65" height="90" :src="`${w.cover}`" />
                    <div class="title">
                        <h5>{{ w.text }}</h5>
                        <div class="autho"><span>{{ w.author }}</span> <span v-show="w.category">/ {{
                            w.category }}</span></div>
                        <div class="content">{{ w.d }}</div>
                    </div>
                </div>
                <div v-show="!w.showDetail" class="search-list">
                    <van-icon class="bookPic" name="records-o" />{{ w.text }}
                </div>

            </div>
        </div>
        <div v-show="reveal && value">
            <div v-show="data.length != 0">
                <h3>书城</h3>
                <SearchResultView :SearchResult="data" />
            </div>
            <div class="empty" v-show="data.length == 0">
                <img src="empty.png" alt="">
                没有找到你想找的内容,换个关键字试试
            </div>
            <!-- </div> -->
        </div>
        <router-view />
    </div>
</template>

<script>

import SearchResultView from '../../components/SearchResultView.vue'
import { HotSearchBooks, searchAdvice, searchResult } from '../../apis/SearchBooks'
export default {
    data() {
        return {
            value: '',
            changeShowHide: true,
            heightList: '100vh',
            list: '',
            words: '',
            data: '',
            reveal: false,
            searchHistoryList: [],
        }
    },
    components: {
        SearchResultView
    },
    methods: {
        onCancel() {
            this.changeShowHide = false;
            this.$router.go(-1);
            this.heightList = 0;
        },
        //热门搜索数据
        async HotSearchBooks() {
            let { list } = await HotSearchBooks();
            this.list = list;
            this.reveal = false;
            console.log('list', list)
        },
        // 搜索建议数据
        async searchAdvice(value) {
            let { words } = await searchAdvice(value);
            this.words = words.w;
            console.log('word', words.w);
        },
        // 搜索结果数据
        async searchResult(value) {
            let { data } = await searchResult(value);
            this.data = data.books;
            this.reveal = true;
            // 添加搜索历史记录
            if (value != '') {
                this.setHistorySearch(value);
            }

            // console.log('data', data.books)
        },
        // 相同的搜索记录要去重
        setHistorySearch(value) {
            // 先把相同的搜索关键字旧的先删除
            this.searchHistoryList = this.searchHistoryList.filter((s) => s != value);
            // 将搜索关键字存入searchHistoryList最前面
            this.searchHistoryList.unshift(value);
            // 将数据更新到localstorage中
            if (this.searchHistoryList[0] != null) {
                localStorage.historySearch = JSON.stringify(this.searchHistoryList);
            }
        },
        // 删除历史记录
        removeHistory() {
            // 先把指定搜索关键字先删除
            this.searchHistoryList = [];
            // 将数据更新到localstorage中
            localStorage.historySearch = JSON.stringify(this.searchHistoryList);
        },
        searchValue(val) {
            this.value = val;
        },
        // 通过localstorage获取历史搜索记录
        getHistorySearch() {
            let searchHistoryList = localStorage.historySearch || "[]";
            searchHistoryList = JSON.parse(searchHistoryList);
            this.searchHistoryList = searchHistoryList;
        },
        searchS(s) {
            this.value = s;
            this.searchResult(s)
            console.log(1111)
        }
    },
    mounted() {
        this.HotSearchBooks();
        this.searchAdvice();
        this.searchResult();
        this.getHistorySearch();
    }
}
</script>
<style lang="scss">
.search-item {
    position: absolute;
    width: 100vw;
    left: 0;
    top: 0;
    background-color: white;
    z-index: 10;

    .empty {
        width: 100%;
        height: 96px;
        text-align: center;

        img {
            width: 84px;
            height: 100px;
            margin: 20px auto;
        }

        font-size: 14px;
        color: #ccc;
    }

    .weekOne {
        display: flex;
        font-size: 12px;
        margin-top: 15px;
        text-align: left;
        color: #777;

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
            font-size: 12px;
            color: #ccc
        }

        .content {
            height: 50px;
            overflow: hidden;
            font-size: 12px;
            color: #ccc
        }

        .bookPic {
            margin-right: 10px;
            color: #ccc;
        }

    }

    .hotsearch-list {
        font-size: 12px;
        text-align: left;
        padding: 5px 15px;
        box-sizing: border-box;

        p {
            color: #acabab;
        }


    }

    .hot-list {
        display: flex;
        flex-wrap: wrap;
        padding-left: 5px;

        .hot-search-list{
            color:#777;
        }

        div {
            width: 45vw;
            text-align: left;
            margin-top: 10px;
            color: #777;
        }

        div span:nth-child(1) {
            display: inline-block;
            text-align: center;
            width: 14px;
            height: 14px;
            line-height: 14px;
            background-color: #e3e2e2;
            color: white;
            border-radius: 50%;
            margin-right: 10px;
        }

        &>div:nth-child(1) .hot-search:nth-child(1) {
            background-color: rgb(201, 2, 2);
        }

        &>div:nth-child(2) .hot-search:nth-child(1) {
            background-color: rgb(201, 75, 2);
        }

        &>div:nth-child(3) .hot-search:nth-child(1) {
            background-color: rgb(201, 131, 2);
        }
    }

    .recentSearch {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        margin-bottom: 15px;
        color: #acabab;

        .deleteHis {
            font-size: 14px;
        }
    }

    .history-list {
        display: inline-block;
        color: #777;
        background-color: #f5f2f2;
        padding: 5px 10px;
        margin-right: 10px;
        border-radius: 999px;
        margin-top: 5px;
    }

    .result {
        padding: 10px 15px;
        box-sizing: border-box;

        p {
            color: #a1a1a1
        }
    }

    .search-list {
        height: 30px;
        width: 92vw;
        line-height: 30px;
        border-bottom: 1px solid #ccc;
        text-align: left;
    }
}</style>
