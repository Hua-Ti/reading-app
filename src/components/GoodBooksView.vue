<template>
    <!-- 好书专区 -->
    <div class="goodBooksSection-item">
        <h4>{{ goodBooksSection.name }}</h4>
        <div>
            <div v-for="p in goodBooksSection.list" :key="p.id">
                <router-link class="weekOne" :to="{ name: 'readingBooks', params: { id: p.id } }">
                    <van-image class="BigImg" width="94" height="132" :src="`${p.cover}`" />
                    <div class="title">
                        <h5>{{ p.title }}</h5>
                        <div class="content">{{ p.content }}</div>
                        <div class="autho">
                            <div>
                                <span>{{ p.author }}</span>
                                <span v-show="p.category">/ {{ p.category }}</span>
                            </div>
                            <div>立即阅读 &gt;</div>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    props: ['goodBooksSection'],
    data() {
        return {

        };
    },

}
</script>
  
<style lang="scss">
.goodBooksSection-item {
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
            margin-top: 0;
        }

        .autho {
            margin-bottom: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .content {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            margin-bottom: 10px;
        }

        .title {
            color: #777;
        }
    }
}
</style>