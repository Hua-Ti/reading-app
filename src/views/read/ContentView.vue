<template>
    <div ref="Content" class="Content-name">
        <!-- {{$route.query.scrollHeight}} -->
        <div ref="contentP" v-show="contentItem != null" v-html="contentItem?.content">
        </div>
        <div class="paidContent" v-show="contentItem == null">
            <van-icon name="after-sale" /> 该篇需要付费观看
        </div>
    </div>
</template>

<script>
import { nextTick } from 'vue';
import { getContent } from '../../apis/readingBook';
export default {
    props: ['uuid', 'contentId'],
    data() {
        return {
            contentItem: '',
            // contentItem: [],
            fontExtent: 8,
            contentWords: '',
        };
    },
    methods: {
        // 获取数据
        async getContentItem() {
            // console.log('contentId', this.contentId)
            // console.log('uuid', this.uuid)
            // let { data } = await getContent(this.uuid, this.contentIdTwo ? this.contentIdTwo : this.contentId);
            let { data } = await getContent(this.uuid, this.contentId);
            this.contentItem = data;
            // this.contentItem.push(data);
            // console.log('data.content', data);
            // console.log('高', this.$route.query.scrollHeight);


            if (this.$route.query.scrollHeight !== undefined) {
                nextTick(() => {
                    //高度设置
                    this.fn(this.$route.query.scrollHeight);
                })
            }
            nextTick(() => {
                // 取出文字（读取）
                // console.log('结构',this.$refs.contentP)
                // console.log('结构',this.$refs.contentP.childNodes[0].innerText)
                //文字数据
                this.contentWords = this.$refs.contentP.childNodes[0].innerText;
                // 将内容存入本地
                this.resetContentWord('contentWords', this.contentWords);
            })
            // console.log('内容总高', this.$refs.Content.htight);
        },
        // 滚动高度
        fn(hei) {
            window.scroll(0, hei);
        },

    },
    created() {
        //监听localStorage的fontExtent(字体大小)变化
        window.addEventListener('setItem', () => {
            this.fontExtent = localStorage.getItem('fontExtent');
        });
    },
    mounted() {
        // 获取数据异步方法
        this.getContentItem();


        //字体大小
        let fontExtent = localStorage.fontExtent;
        this.fontExtent = fontExtent ? fontExtent : this.fontExtent;


    },
    watch: {
        contentId() {
            this.getContentItem();
        },
        fontExtent() {
            this.$refs.Content.style.fontSize = Number(this.fontExtent) + 2 + 'px';
            return this.fontExtent;
        }
    },

}

</script>

<style lang="scss">
.Content-name {
    margin-bottom: 150px;
    width: 100%;
    min-height: 70vh;

    h1 {
        font-size: 1.5em;
        text-align: center;
    }

    .m-content {
        text-align: left;
        padding: 0 15px;
        box-sizing: border-box;

        p {
            text-indent: 2em;
        }
    }

    .paidContent {
        margin: 100px auto;
        font-size: 18px;
    }


}
</style>