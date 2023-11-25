<template>
  <div class="about">
    <div class="search">
      <!-- <span @click="sex = sex == 1 ? 1 : 2">{{ sex }}</span> -->
      <router-link to="/serachBooks">
        <van-search class="search-item" v-model="value" shape="round" background="#white" placeholder="请输入搜索关键词"
          right-icon="search" left-icon="" disabled />
      </router-link>
    </div>


    <van-tabs class="tabbar" v-model="activeName">
      <van-tab :to="{ name: typeArr[index], params: { id: item.id, name: item.name, url: item.url } }"
        v-for="(item, index) in data" :key="item.id" :title="`${item.name}`"></van-tab>
    </van-tabs>

    <router-view />
  </div>
</template>

<script>
import { getBookMallSex } from '../apis/BookMall';

const activeNameIndex = {
  winnow: 0,
  free: 1,
  boyStudent: 2,
  schoolgirl: 3,
  comeOut: 4,
  listenToABook: 5
}
export default {
  data() {
    return {
      // 类型
      typeArr: ['winnow', 'free', 'boyStudent', 'schoolgirl', 'comeOut', 'listenToABook'],
      // 搜索值
      value: '',
      // 男女模式
      sex: 1,
      // 类型下标（高亮）
      // activeName: 0,
      // 导航栏
      data: [],
    };
  },
  computed: {
    activeName: {
      get() {
        const { name } = this.$route;
        console.log('1111', name)
        const index = activeNameIndex[name] || 0;
        return index;
      },
      set() { }
    }
  },
  async mounted() {
    let { data } = await getBookMallSex(this.sex);
    this.data = data.navi;
    console.log('this.data', this.data)
  },
  methods: {
    fn() {
      this.$emit('chang');
    }
  }

};
</script>
<style lang="scss">
.search {
  height: 54px;
}
</style>
