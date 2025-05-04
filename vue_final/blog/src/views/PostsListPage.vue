<script setup>
import PostCard from '@/components/PostCard.vue'

import { usePostStore } from '@/stores/postStore'
import { onMounted } from 'vue'

const postStore = usePostStore()

onMounted(() => {
  postStore.fetchPosts()
})
</script>

<template>
  <section class="container postslist">
    <h2>글목록</h2>

    <div v-if="postStore.loading" class="loading">게시물을 불러오는 중...</div>
    <div v-else-if="postStore.error" class="error">{{ postStore.error }}</div>

    <div v-else>
      <div v-if="postStore.posts.length === 0" class="no-posts">게시물이 없습니다.</div>
      <PostCard v-for="post in postStore.getSortedPosts" :key="post.id" :post="post" />
    </div>
  </section>
</template>

<style scoped></style>
