<template>
    <div class="listenBooks-item">
        <div @click="play(content)">哈哈</div>
    </div>
</template>
<script>
// import { getListenBooksAll } from '../../apis/listenBookAll'
import Speech from 'speak-tts'
export default {
    // props:['id']
    data() {
        return {
            sourceUuid: 'audio_cf559bbbda5245a8a76c4fc65b9b52ae_4',
            speech: null,
            content: ''
        }
    },
methods: {
    SpeechInit() {
        this.speech = new Speech()
        this.speech.setLanguage('zh-CN')
        this.speech.init().then(() => { })
    },
    //播放函数
    play(textContent) {
        console.log(111)
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
    },
    //暂停
    paused() {
        this.speech.pause();
    },
    //从暂停处继续播放
    goahead() {
        this.speech.resume();
    }

},
mounted() {
    // this.getListenBooksAll();
    this.SpeechInit() // 需要初始化
},
//离开页面取消语音，不取消可能会造成奇妙的bug
destroyed() {
    this.speech.cancel();
}

}
</script>
<style lang="scss"></style>