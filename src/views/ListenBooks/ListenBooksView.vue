<template>
    <div class="listenBooks-item">
        <van-nav-bar title="标题" left-text="返回" right-text="按钮" left-arrow @click-left="onClickLeft"
             />
    </div>
</template>
<script>
import { getListenBooks } from '../../apis/listenBooks'
export default {
    // props:['id']
    data() {
        return {
            sourceUuid: 'audio_cf559bbbda5245a8a76c4fc65b9b52ae_4',
        }
    },
    methods: {
        async getListenBooks() {
            const { data } = await getListenBooks(this.sourceUuid);
            console.log('data', data)
        },
        onClickLeft() {
            this.$router.go(-1);
        },
    },
    mounted(){
        this.getListenBooks();
    }
}
</script>
<style lang="scss">
.listenBooks-item{
    width: 100vw;
    height: 100vh;
    padding: 10px 15px;
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
    background-color: white;
}
</style>