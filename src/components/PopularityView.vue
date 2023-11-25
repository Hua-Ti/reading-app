<template>
    <!-- 人气NO.1组件 -->
    <div class="Popularity-item">
        <h4>{{ Popularity.name }}</h4>
        <div>
            <div v-for="p in Popularity.list" :key="p.id">
                <router-link class="weekOne" :to="{ name: 'readingBooks', params: { id: p.id } }">
                    <van-image class="BigImg" width="94" height="132" :src="`${p.cover}`" />
                    <div class="title">
                        <h5>{{ p.title }}</h5>
                        <div class="autho"><span>{{ p.author }}</span> <span v-show="p.category">/ {{ p.category }}</span>
                        </div>
                        <div class="content">{{ p.content }}</div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    props: ['Popularity'],
    data() {
        return {

        };
    },

}
</script>
  
<style lang="scss">
.Popularity-item {
    padding: 0 15px;
    box-sizing: border-box;
    text-align: left;
    margin-bottom: 10px;
    color: #777;

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

        .title {
            color: #777;
        }

    }
}
</style>