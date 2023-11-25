import Vue from 'vue'
import VueRouter from 'vue-router'
import BookMallView from '../views/BookMallView.vue'
import BookshelfView from '../views/BookshelfView.vue'
import SortView from '../views/SortView.vue'
import MineView from '../views/MineView.vue'

Vue.use(VueRouter);

const routes = [
  {
    // 书城
    path: '/',
    // alias: ['/bookmall'],
    name: 'bookmall',
    component: BookMallView,
    props: true,
    children: [
      {
        // 精品
        path: '',
        // path:'/:id&:name&:url',
        name: 'winnow',
        props: true,
        component: () => import('../views/BookMallChildren/WinnowView.vue')
      },
      {
        // 免费
        path: 'free/:id&:name&:url',
        name: 'free',
        props: true,
        component: () => import('../views/BookMallChildren/FreeView.vue')
      },
      {
        // 男生
        path: 'boyStudent/:id&:name&:url',
        name: 'boyStudent',
        props: true,
        component: () => import('../views/BookMallChildren/BoyStudentView.vue')
      },
      {
        // 女生
        path: 'schoolgirl/:id&:name&:url',
        name: 'schoolgirl',
        props: true,
        // component:SchoolgirlView
        component: () => import('../views/BookMallChildren/SchoolgirlView.vue')
      },
      {
        // 出版
        path: 'comeOut/:id&:name&:url',
        name: 'comeOut',
        props: true,
        // component:ComeOutView
        component: () => import('../views/BookMallChildren/ComeOutView.vue')
      },
      {
        // 听书
        path: 'listenToABook/:id&:name&:url',
        name: 'listenToABook',
        props: true,
        component: () => import('../views/BookMallChildren/ListenToABookView.vue')
      },
    ]
  },
  {
    // 书架
    path: '/bookshelf',
    name: 'bookshelf',
    component: BookshelfView
    // component: () => import('../views/BookshelfView.vue')
  },
  {
    // 分类
    path: '/sort',
    name: 'sort',
    component: SortView,
    // component: () => import('../views/SortView.vue')
    children: [
      {
        path: ':id&:url',
        name: 'sortBook',
        props: true,
        component: () => import('../views/BigSort/BigSortBooksView.vue'),
        children: [
          {
            path: ':url',
            name: 'sortCont',
            props: true,
            component: () => import('../views/BigSort/SortContView.vue')
          }
        ]
      }
    ]
  },
  {
    // 我的
    path: '/mine',
    name: 'mine',
    component: MineView
    // component: () => import('../views/MineView.vue')
  },
  //书籍大分类
  {
    path: '/rankNavi:id&:name&:url',
    name: 'rankNavi',
    props: true,
    component: () => import('../views/RankNaviView.vue')
  },
  // 路由重定向
  {
    path: "/",
    redirect: "winnow"
  },
  {
    path: '/serachBooks',
    name: 'serachBooks',
    props: true,
    component: () => import('../views/SearchBooks/SearchBooksView.vue')
  },
  {
    path: '/readingBooks:id',
    name: 'readingBooks',
    props: true,
    component: () => import('../views/read/ReadingBooksView.vue'),
    children: [
      {
        path: ':uuid&:contentId',
        name: 'content',
        props: true,
        component: () => import('../views/read/ContentView.vue'),
        children: [
          {
            // 听书(全部)
            path: '/listenBooksAll',
            name: 'listenBooksAll',
            props: true,
            component: () => import('../views/listenBooksAll/listenBooksAllView.vue')
          }
        ]
      }
    ]
  },
  {
    path: "/readingBooks:id",
    redirect: "content"
  },
  {
    path: '/ListenBooks',
    name: 'ListenBooks',
    props: true,
    component: () => import('../views/ListenBooks/ListenBooksView.vue')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
