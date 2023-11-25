<template>
  <div id="app">
    <!-- <button @click="changeMode(isDark)" active-color="#13ce66" inactive-color="#ff4949">
      暗夜模式
    </button> -->

    <van-tabbar v-model="active" active-color="#ee0a24" inactive-color="#000">
      <van-tabbar-item to="/bookshelf" icon="home-o">书架</van-tabbar-item>
      <van-tabbar-item to="/" icon="search">书城</van-tabbar-item>
      <van-tabbar-item to="/sort" icon="apps-o">分类</van-tabbar-item>
      <van-tabbar-item to="/mine" icon="friends-o">我的</van-tabbar-item>
    </van-tabbar>
    <router-view />
  </div>
</template>

<script>

const ActiveIndex = {
  '/bookshelf': 0,
  '/': 1,
  '/sort': 2,
  '/mine': 3
};
export default {
  data() {
    return {
      //书城
      //  active:1
      dataIndex: ['/bookshelf', '/', '/sort', '/mine'],
      // isDark: false,

    }
  },
  computed: {
    active: {
      get() {
        const { path } = this.$route;
        let index = 1;
        if (this.dataIndex.indexOf(path) != -1) {
          index = ActiveIndex[path];
        }
        return index;
      },
      set() { },
    }
  },
  methods: {
    // // 模式切换
    // changeMode(val) {
    //   console.log('hhhh')
    //   // 获取html根元素标签
    //   let html = document.documentElement
    //   if (val == false) {
    //     this.isDark = true;
    //     // html添加class="dark"选择器
    //     html.classList.add('dark')
    //   } else if (val == true) {
    //     this.isDark = false;
    //     // html移除class="dark"选择器
    //     html.classList.remove('dark')
    //   }
    // }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  .van-tabs__line {
    width: 14px;
    bottom: 24px;
  }
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.footer {
  width: 100%;
  text-align: center;
  height: 40px;
  line-height: 40px;
  background-color: #f9f8f8;
  color: #807e7e;
}
</style>
