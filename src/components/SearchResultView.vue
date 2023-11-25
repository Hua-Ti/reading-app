<template>
    <!-- 搜索推荐组件 -->
    <div class="SearchResult-item">
            <div  v-for="s in SearchResult" :key="s.bookId">
                <router-link class="weekOne" :to="{ name: 'readingBooks', params: { id: s.bookId } }">
                    <van-image class="BigImg" width="94" height="132" :src="`${s.cover}`" />
                    <div class="title">
                        <h5>{{ s.title }}</h5>
                        <div class="autho"><span>{{ s.author }}</span> <span v-show="s.category">/ {{ s.category }}</span>
                        </div>
                        <div class="content">{{ s.summary }}</div>
                    </div>
                </router-link>
            </div>
        </div>
  
</template>
<script>

export default {
    props: ['SearchResult'],
    data() {
        return {

        };
    },
    mounted(){
        if(this.SearchResult!=''){
            console.log('ddfdsfsd',this.SearchResult)
        }
        console.log(1111)
    }

}
</script>
  
<style lang="scss">
.SearchResult-item {
    padding: 0 15px;
    box-sizing: border-box;
    text-align: left;
    margin-bottom: 10px;
    h4 {
        margin: 6px;
        margin-top: 10px;
    }

    .weekOne {
        display: flex;
        font-size: 12px;
        margin-top: 15px;

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
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
        }

    }
}
</style>