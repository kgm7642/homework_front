<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePostStore } from '@/stores/postStore'
import { useToastStore } from '@/stores/toastStore'

const route = useRoute()
const router = useRouter()
const postStore = usePostStore()
const toastStore = useToastStore()

const post = ref(null)
const loading = ref(true)
const error = ref(null)

const postId = route.params.postId
const isDeleting = ref(false)

onMounted(async () => {
  try {
    post.value = await postStore.getPostById(route.params.postId)
    if (!post.value) {
      error.value = '존재하지 않는 게시물입니다.'
      toastStore.showToast(error.value, 'error')
    }
    loading.value = false
  } catch (err) {
    error.value = `게시물 불러오는데 실패함 ${err.message}`
    toastStore.showToast(error.value, 'error')
    loading.value = false
  }
})
const goBack = () => {
  router.push('/postsList')
}

const goEdit = () => {
  router.push(`/edit/${route.params.postId}`)
}

const handleDelete = async () => {
  const confirmed = window.confirm('게시글 삭제합니까??')

  if (!confirmed) {
    return
  }

  try {
    isDeleting.value = true
    await postStore.deletePost(postId)
    toastStore.showToast('게시글 삭제 성공')
    router.push({ name: 'postsList' })
  } catch (error) {
    error.value = `게시글을 불러오는데 실패함`
    toastStore.showToast(error.value, 'error')
  } finally {
    isDeleting.value = false
  }
}
</script>

<template>
  <section class="container postdetail">
    <h2>글상세</h2>

    <div v-if="loading" class="loading">게시글을 불러오는중...</div>

    <div v-else-if="post">
      <div class="contentbox">
        <p class="title">{{ post.title }}</p>
        <p class="content">{{ post.content }}</p>
        <p class="author">{{ post.author }}</p>
        <p class="date">{{ postStore.formatDate(post.createAt) }}</p>
      </div>
      <div class="btns-group">
        <button @click="goBack">글목록</button>
        <button @click="goEdit" class="point">글수정</button>

        <button @click="handleDelete" :disabled="isDeleting" class="danger">
          {{ isDeleting ? '삭제 중...' : '삭제하기' }}
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
