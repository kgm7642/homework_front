<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { usePostStore } from '@/stores/postStore'

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
})

const router = useRouter()
const postStore = usePostStore()

const goDetail = () => {
  router.push({ name: 'PostDetail', params: { postId: props.post.id } })
}
</script>

<template>
  <div class="PostCard" @click="goDetail">
    <p>{{ post.title }}</p>
    <span>{{ postStore.formatDate(post.createdAt) }}</span>
  </div>
</template>

<style scoped>
.PostCard {
  border: 1px solid #ccc;
  padding: 1em;
  margin: 1em 0;
  border-radius: 5px;
  background-color: #f9f9f9;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  transition: background-color 0.3s;
}
.PostCard:hover {
  background-color: #e9e9e9;
}
.PostCard p {
  font-weight: bold;
}
.PostCard span {
  color: #666;
  font-size: 0.75em;
}
</style>
