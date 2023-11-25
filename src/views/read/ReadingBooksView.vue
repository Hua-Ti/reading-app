<template>
    <div class="reading" ref="read">
        <div class="title">
            <van-nav-bar left-text="返回" right-text="加入书架" left-arrow
                @click-left="leave($route.params.uuid, $route.params.contentId)" />
        </div>
        <!-- 控制 -->
        <div class="catalogue-list">
            <p>{{ uuid ? uuid[activeKey].title : '' }}</p>

            <div class="progress-ma">
                <!-- 上一章 -->
                <router-link replace :to="{ name: 'content', params: { contentId: uuid ? uuid[activeKey].secId : '' } }">
                    <span class="Spanlist" @click="preContent">&lt;</span>
                </router-link>
                <!-- 章节进度条 -->
                <van-slider v-model="value" active-color="#ee0a24" @change="onChange(value)"
                    @drag-start="satrtChange(value)">
                    <template #button>
                        <div class="custom-button">{{ value }}</div>
                    </template>
                </van-slider>
                <!-- 下一章 -->
                <router-link replace
                    :to="{ name: 'content', params: { contentId: uuid ? uuid[activeKey == 0 ? 0 : activeKey].secId : '' } }">
                    <span class="Spanlist" @click="nextContent">&gt;</span>
                </router-link>
            </div>

            <div class="directory-menu">
                <div class="return">
                    <van-nav-bar left-text="返回" @click-left="leave($route.params.uuid, $route.params.contentId)" />
                </div>
                <van-cell class="directory" @click="showPopup">目录</van-cell>
                <!-- 设置模块 -->
                <div>
                    <div>
                        <van-cell @click="showChangeSetUp">设置</van-cell>
                        <van-popup v-model="changeSetUp" position="bottom" :style="{ height: '20%' }">
                            <!-- 字体大小 -->
                            <div class="fontSize">
                                <span>字体</span>
                                <span @click="removeFont(fontExtent)">A-</span>
                                <span>{{ fontExtent }}</span>
                                <span @click="addFont(fontExtent)">A+</span>
                            </div>
                            <!-- 主题 -->
                            <div class="theme">
                                <span>主题</span>
                                <!-- 主题背景色，下标对应高亮 -->
                                <span v-for="(i, index) in arrRef" :key="index" :class="{ active: index == indexHighlight }"
                                    :ref="i" @click="bgColor(index)"></span>
                            </div>
                        </van-popup>
                    </div>
                </div>
                <span class="night" @click="night" ref="night">夜间</span>
            </div>
        </div>
        <div class="nav-item">
            <van-popup v-model="show" position="left" :style="{ width: '70%', height: '100vh' }">
                <div class="catalogue">
                    <van-sidebar v-model="activeKey">
                        <van-sidebar-item replace :to="{ name: 'content', params: { uuid: id, contentId: u.secId } }"
                            v-for="u in uuid" :key="u.secId" :title="u.title" :badge="charge(u.leaf, u.paid, u.price)">
                        </van-sidebar-item>
                    </van-sidebar>
                </div>
            </van-popup>
        </div>
        <div @click="play(contentWords)" class="listenAllBooks"><van-icon name="service" /></div>
        <div @click="paused" class="listenAllBooks1"><van-icon name="play-circle-o" /></div>
        <div @click="goahead" class="listenAllBooks2"><van-icon name="pause-circle-o" /></div>

        <router-view />
    </div>
</template>
<script>
import { Toast, Dialog } from "vant";
import { getIds } from '../../apis/readingBook';
import Speech from 'speak-tts';
export default {
    props: ['id'],
    data() {
        return {
            // 点击的章节
            activeKey: 0,
            // 书籍ID
            uuid: '',
            // 章节ID
            contentId: '',
            show: false,
            // 章节总长度
            len: 0,
            // 观看记录
            arr: [],
            // 设置的显示隐藏切换
            changeSetUp: false,
            // 背景色
            bgColorArr: ['rgb(218, 232, 232)', 'rgb(228, 249, 239)', 'rgb(236, 240, 238)', 'rgb(234, 224, 245)', 'rgb(0,0,0,.5)'],
            // 背景色指示器数据（需要高亮）
            arrRef: ['bgOnes', 'bgTow', 'bgThree', 'bgFour', 'bgFive'],
            // 默认指示器下标
            indexHighlight: 2,
            // 字体默认大小
            fontExtent: 8,
            // 滚动高度
            scrollHeight: 0,
            // 进度条的值
            value: 0,
            // 开始拖动进度条的值
            startValue: 0,
            //读过的章节下标
            chapterSubscript: 0,
            // 是否切换黑夜模式
            // isDark: false,
            //阅读后默认高度
            scHei: 0,

            // 听书部分
            speech: null,
            content: '',
            // 听书内容
            contentWords: '',
            // 阅读开关
            // PlayRead: true,
        };
    },
    created() {
        // //阅读过的书籍id和章节id以及高度
        // let arr = localStorage.arr;
        // if (arr != "" && arr != undefined) {
        //     arr = JSON.parse(arr)
        // } else {
        //     arr = [];
        // }
        // if (arr != []) {
        //     console.log('arr', arr);
        //     let data = arr.filter((s) => {
        //         // console.log('sss',s)
        //         // console.log('s.uuid',s.uuid)
        //         // console.log('this.id',this.id)
        //         return this.id == s.uuid
        //     })
        //     // console.log('高',data);
        //     if (data != []) {
        //         // console.log('确定数据',data);
        //         // console.log('确定数据内容ID',data[0].contentId);
        //         // console.log('确定数据高',data[0].scrollHeight);

        //         this.contentId = data[0].contentId;
        //         // this.scrollHeight = data[0].scrollHeight;
        //         // console.log('高数据', data[0].scrollHeight);
        //     }
        // }
    },
    methods: {
        // 获取目录数据
        async getIdlist() {
            console.log('i111d', this.id)
            let { data } = await getIds(this.id);
            this.uuid = data ? data.catalog : null;
            this.len = this.uuid.length;

            // console.log('uuid', this.uuid);
            if (this.contentId == '') {
                this.contentId = this.uuid[0].uuid
                console.log('未读此书，默认contentId为', this.contentId);
            } else {
                console.log('读过此书，contentId为', this.contentId);
                // console.log('读过此书，scrollHeight为', this.scrollHeight);

                // 章节高亮
                this.uuid.map((item, index) => {
                    if (item.uuid == this.contentId) {
                        this.activeKey = index
                    }
                    return;
                })
            }
            // 跳转到子页面
            this.$router.replace({
                name: 'content',
                params: {
                    uuid: this.id,
                    contentId: this.contentId
                },
                query: {
                    scrollHeight: this.scrollHeight
                }
            })
        },
        // 目录弹出层
        showPopup() {
            this.show = true;
        },
        // 判断是收费，解锁，还是免费
        charge(leaf, paid, price) {
            if (price !== 0 && leaf && paid) {
                return `收费`
            } else if (price !== 0 && leaf) {
                return `未解锁`
            }
            else {
                return ''
            }
        },
        // 上一章
        preContent() {
            if (this.activeKey >= 1) {
                this.activeKey = this.activeKey - 1;
                this.value = Math.floor(this.activeKey * 100 / this.len * 100) / 100;
                // 高度回归0
                window.scroll(0, 0);
            } else {
                Toast('已是第一章');
            }
        },
        // 下一章
        nextContent() {
            if (this.activeKey < this.len) {
                this.activeKey = this.activeKey + 1;
                this.value = Math.floor(this.activeKey * 100 / this.len * 100) / 100;
                // 高度回归0
                window.scroll(0, 0);
            } else {
                Toast('已是最后一章');
            }
        },
        // 离开页面，将阅读书籍的id和章节Id存入localStorage
        leave(uuid, contentId) {
            let data = { uuid: uuid, contentId: contentId, scrollHeight: this.scrollHeight }
            if (data.uuid != undefined && data.contentId != undefined && data.scrollHeight != undefined) {
                // console.log('存入arr的数据', data);
                // console.log('原始数据',this.arr);
                // 阅读数据去重处理
                this.arr = this.arr.filter((item) => data.uuid !== item.uuid)
                // console.log('修改后数据',this.arr)
                this.arr.push(data);
                localStorage.arr = JSON.stringify(this.arr);
            }
            this.$router.go(-1);
        },
        // 夜间/白天模式切换
        night() {
            // console.log(11)
            let html = document.documentElement
            console.log(this.$refs.night.innerText)
            if (this.$refs.night.innerText == '夜间') {
                this.$refs.night.innerText = '日间'
                // this.isDark = true;
                // html添加class="dark"选择器
                html.classList.add('dark')
            }
            else if (this.$refs.night.innerText == '日间') {
                this.$refs.night.innerText = '夜间'
                // html移除class="dark"选择器
                html.classList.remove('dark')
            }
        },
        //设置弹出内容
        showChangeSetUp() {
            this.changeSetUp = true;
        },
        // 设置主题颜色
        bgColor(indexHighlight) {
            this.indexHighlight = indexHighlight;
            // 背景色
            this.$refs.read.style.backgroundColor = this.bgColorArr[indexHighlight];
            // 将点击高亮的背景色下标存入本地localStorage
            localStorage.indexHighlight = indexHighlight;
        },
        // 字体加大
        addFont(fontExtent) {
            if (this.fontExtent < 20) {
                this.fontExtent = fontExtent + 2;
                // 存入本地（被监听）
                this.resetSetItem('fontExtent', this.fontExtent);
            } else {
                Toast('已达到最大字号');
            }
        },
        // 字体减小
        removeFont(fontExtent) {
            if (this.fontExtent > 8) {
                this.fontExtent = fontExtent - 2;
                // 存入本地（被监听）
                this.resetSetItem('fontExtent', this.fontExtent);
            } else {
                Toast('已达到最小字号');
            }
        },
        // 开始拖动进度条时
        satrtChange(value) {
            // console.log('开始变化', value)
            this.startValue = value;
        },
        // 拖动进度条，章节的变化
        onChange(value) {
            // Toast('当前值：' + value);
            Dialog.confirm({
                title: '确定要跳转吗？？',
            })
                .then(() => {
                    // 点击确认
                    // 确定跳转，章节变化
                    this.activeKey = Math.floor(value * this.len / 100);
                    // 获取数据
                    this.$router.replace({
                        name: 'content',
                        params: {
                            contentId: this.uuid[this.activeKey].secId
                        }
                    })
                    return true;
                })
                .catch(() => {
                    // 点击取消
                    // 不跳转，恢复原来的进度条值
                    this.value = this.startValue;
                    return false;
                });
        },
        //听书初始化
        SpeechInit() {
            this.speech = new Speech()
            this.speech.setLanguage('zh-CN')
            this.speech.init().then(() => { })
        },
        //播放函数
        play(textContent) {
            console.log(111)
            // if (this.PlayRead == true) {
            // this.PlayRead = false;
            this.speech.speak({
                text: textContent,// 播放的文本内容
                listeners: {
                    //开始播放
                    onstart: () => { console.log("Start utterance") },
                    //判断播放是否完毕
                    onend: () => { console.log("End utterance") },
                    //恢复播放
                    onresume: () => { console.log("Resume utterance") },
                },
            }).then(() => { console.log("读取成功") })
            // }
        },
        //暂停
        paused() {
            // if (this.PlayRead == false) {
            // this.PlayRead = true;
            this.speech.pause();
            // }
        },
        //从暂停处继续播放
        goahead() {
            // if (this.PlayRead == false) {
            this.speech.resume();
            // this.PlayRead = false;
            // }
        }
    },
    mounted() {
        // 取出阅读数据
        let newArr = localStorage.arr;
        if (newArr != '' && newArr != undefined) {
            newArr = JSON.parse(newArr);
            // 数据更新
            this.arr = newArr;
            // 判断当前阅读书籍是否读过，读过取出该书籍章节ID
            for (let i in newArr) {
                if (this.id == newArr[i].uuid) {
                    //更新到读过的章节和高度
                    this.contentId = newArr[i].contentId;
                    this.scrollHeight = newArr[i].scrollHeight;
                }
            }
        }
        // 获取数据
        this.getIdlist();

        // 取出背景色下标
        let index = localStorage.indexHighlight;
        // 判断背景色下标,默认为3
        this.indexHighlight = index ? index : 3;
        // 背景色
        this.$refs.read.style.backgroundColor = this.bgColorArr[this.indexHighlight];

        // 字体大小
        let fontExtent = localStorage.fontExtent;
        this.fontExtent = fontExtent ? Number(fontExtent) : this.fontExtent;

        // 内容数据变更
        let contentWords = localStorage.contentWords;
        this.contentWords = contentWords ? contentWords : '';
        console.log('数据变更', this.contentWords);



        // 输出滚动条高度
        window.onscroll = () => {
            this.scrollHeight = document.body.scrollTop || document.documentElement.scrollTop;
            // console.log('滚动高度', this.scrollHeight);
        };

        // 需要初始化(听书)
        this.SpeechInit();


        console.log('sdusdjoijoijoaisdfjoafewdwef')
        //监听localStorage的fontExtent(字体大小)变化
        window.addEventListener('setItem', () => {
            this.contentWords = localStorage.getItem('contentWords');
        });
    },
    components: {
    },
    watch: {
        // 通过章节变化来改变进度条的值
        activeKey() {
            // 进度条的值
            this.value = Math.floor(this.activeKey * 100 / this.len * 100) / 100;
            // // 更新开关
            // this.PlayRead = true;
            console.log('121221212')
            this.speech.cancel();
            window.addEventListener('setItem', () => {
                this.contentWords = localStorage.getItem('contentWords');
            });
            console.log('数据已经变化', this.textContent)
            // this.play(this.textContent)
        }

    },
    //离开页面取消语音，不取消可能会造成奇妙的bug
    destroyed() {
        this.speech.cancel();
    }
}
</script>
<style lang="scss">
.reading {
    position: absolute;
    width: 100vw;
    height: auto;
    left: 0;
    top: 0;
    background-color: white;
    z-index: 1;

    .title {
        color: #777;
    }

    .catalogue {
        width: 10vw;
        height: 100vh;
        // background-color: blanchedalmond;
        position: fixed;
    }

    .catalogue-list {
        position: fixed;
        width: 100vw;
        // height: 10vh;
        bottom: 0;
        left: 0;
        background-color: white;

        p {
            border-top: 1px solid #eae7e7;
            padding: 10px 0;
            margin: 0;
        }
    }

    .van-sidebar {
        width: 70vw;
        text-align: left;
    }

    .van-sidebar-item__text {
        position: static;
    }

    .van-info {
        top: 27px;
        right: 32px;
        padding: 2px 5px;
        background-color: #c6b7c46e;
    }

    .progress-ma {
        display: flex;
        justify-content: space-evenly;
        align-items: center;

        .progress-val {
            width: 80vw;
        }

        .Spanlist {
            margin: 0 10px;
            color: #ccc;
            font-family: 仿宋;
            font-weight: bold;
        }
    }

    .directory {
        width: 60px;
        margin-left: 54px;
    }

    .directory-menu {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .theme {
        display: flex;
        padding: 10px 15px;
        box-sizing: border-box;
        border: 1px solid #edebeb;

        &>span:nth-child(1) {
            display: inline-block;
            width: 30px;
            height: 30px;
            line-height: 30px;
            font-size: 14px;
            color: #ff914d;
        }

        &>span:not(:nth-child(1)) {
            display: inline-block;
            width: 25px;
            height: 25px;
            margin-left: 20px;
            border-radius: 50%;
            margin-top: 2px;
            box-sizing: border-box;
        }

        &>span:nth-child(2) {
            background-color: rgb(218, 232, 232);
        }

        &>span:nth-child(3) {
            background-color: rgb(228, 249, 239);
        }

        &>span:nth-child(4) {
            background-color: rgb(236, 240, 238);
        }

        &>span:nth-child(5) {
            background-color: rgb(234, 224, 245);
        }

        &>span:nth-child(6) {
            background-color: rgb(0, 0, 0, .5);
        }
    }

    .active {
        border: 2px solid #ff914d;
    }

    .fontSize {
        display: flex;
        justify-content: space-around;
    }

    .custom-button {
        width: 30px;
        color: #fff;
        font-size: 10px;
        line-height: 18px;
        text-align: center;
        background-color: #d4d0d0;
        border-radius: 100px;
    }

    .van-slider__bar {
        background: #d4d0d0 !important;
    }

    .van-slider {
        margin: 0 10px;
    }

    .return {
        .van-nav-bar__text {
            color: #323233;
        }

        .van-nav-bar__left {
            width: 40px;
        }
    }

    .night {
        padding: 0 15px;
    }

    .listenAllBooks {
        position: fixed;
        right: 25px;
        bottom: 132px;
        font-size: 30px;
        background: #7db9b9;
        color: white;
        padding: 5px;
        width: 34px;
        height: 34px;
        border-radius: 50%;
        z-index: 100;
    }

    .listenAllBooks1 {
        position: fixed;
        right: 75px;
        bottom: 132px;
        font-size: 30px;
        background: #7db9b9;
        color: white;
        padding: 5px;
        width: 34px;
        height: 34px;
        border-radius: 50%;
        z-index: 100;
    }

    .listenAllBooks2 {
        position: fixed;
        right: 125px;
        bottom: 132px;
        font-size: 30px;
        background: #7db9b9;
        color: white;
        padding: 5px;
        width: 34px;
        height: 34px;
        border-radius: 50%;
        z-index: 100;
    }
}
</style>