<template>
    <!-- 图片组件 -->
    <div class="onepicture-item">
        <van-image class="pic" :src="onepicture.cover"  :to="{ name: 'readingBooks', params: { id: onepicture.id } }"/>
    </div>
</template>
<script>

export default {
    props: ['onepicture'],
    data() {
        return {

        };
    },

}
</script>
  
<style lang="scss">
.onepicture-item {
    padding: 0 15px;
    box-sizing: border-box;

    .pic{
        width: calc(100vw - 30px);
        border-radius: 5px;
        overflow: hidden;
    }


}
</style>