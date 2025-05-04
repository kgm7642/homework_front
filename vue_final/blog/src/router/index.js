import { createRouter, createWebHistory } from 'vue-router'
import NotFoundPage from '@/views/NotFoundPage.vue'

import AboutPage from '@/views/AboutPage.vue'
import PostsListPage from '@/views/PostsListPage.vue'
import PostDetailPage from '@/views/PostDetailPage.vue'
import PostEditPage from '@/views/PostEditPage.vue'
import PostWritePage from '@/views/PostWritePage.vue'
import LayoutPage from '@/views/LayoutPage.vue'
import MainPage from '@/views/MainPage.vue'

const routes = [
  {
    path: '/',
    name: 'root',
    component: LayoutPage,
    children: [
      {
        path: '',
        name: 'main',
        component: MainPage,
      },
      {
        path: '/about',
        name: 'About',
        component: AboutPage,
      },
      {
        path: 'postsList',
        name: 'postsList',
        component: PostsListPage,
      },
      {
        path: 'postWrite',
        name: 'postWrite',
        component: PostWritePage,
      },
      {
        path: 'post/:postId',
        name: 'postDetail',
        component: PostDetailPage,
        props: true,
      },
      {
        path: 'edit/:postId',
        name: 'PostEdit',
        component: PostEditPage,
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundPage,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
