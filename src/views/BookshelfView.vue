<template>
  <div class="home">
    <div>
      <p>书架</p>
      <router-link :to="{ name: 'readingBooks', params: { id: data.id } }">
        <div class="shelf">
          <van-image width="50" height="70" :src="data.cover" />
          <div class="title">
            <div class="shelf-title"><span>{{ data.title }}</span><span>{{ data.readInfo }}</span></div>
            <p>{{ data.description }}</p>
          </div>
        </div>
      </router-link>
      <div class="content-shelf">
        <router-link v-for="n in newData" :key="n.id" :to="{ name: 'readingBooks', params: { id: n.id } }">
          <div class="shelf-menu">
            <van-image width="100" height="130" :src="n.cover" />
            <p>{{ n.title }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import { getShelf, getShelfContent } from '../apis/bookshelf';

export default {
  data() {
    return {
      data: '',
      newData: ''
    }
  },
  methods: {
    async getShelf() {
      let { data } = await getShelf();
      this.data = data.banners[0]
      console.log('data', data.banners[0])
    },
    async getShelfContent() {
      let { data } = await getShelfContent();
      this.newData = data.list
      console.log('newData', data.list)
    }
  },
  mounted() {
    this.getShelf();
    this.getShelfContent();
  }

}
</script>
<style lang="scss">
.home {
  padding: 10px 15px;
  box-sizing: border-box;

  .shelf {
    display: flex;
    text-align: left;
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #eae9e9;
    padding: 5px;
    box-sizing: border-box;

    .title {
      margin-left: 10px;
      font-size: 14px;

      p {
        color: #ccc;
        margin-top: 10px;
      }
    }

    .shelf-title {
      display: flex;
      justify-content: space-between;

      &>span:nth-child(2) {
        font-size: 12px;
        color: red;
      }
    }
  }
  .content-shelf{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .shelf-menu{
    text-align: left;
    flex: 1;
    width: 100px;
    margin-bottom: 10px;
    color:#333;
    border-radius: 3px;
    p{
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}</style>
