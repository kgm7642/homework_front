import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import { useToastStore } from './toastStore'

const API_URL = 'http://localhost:5500/posts'

export const usePostStore = defineStore('post', () => {
  // ✅ state
  const posts = ref([])
  const loading = ref(false)
  const error = ref(null)

  // ✅ getters
  const getSortedPosts = computed(() => {
    return [...posts.value].sort((a, b) => b.createdAt - a.createdAt)
  })

  // ✅ actions
  const fetchPosts = async () => {
    const toastStore = useToastStore()
    posts.value = []
    loading.value = true
    error.value = null

    try {
      const response = await axios.get(API_URL)
      posts.value = response.data
    } catch (err) {
      error.value = err.message || '게시물을 불러오는데 실패했습니다.'
      toastStore.showToast(error.value, 'error')
    } finally {
      loading.value = false
    }
  }

  const getPostById = async (id) => {
    const toastStore = useToastStore()
    try {
      const response = await axios.get(`${API_URL}/${id}`)
      return response.data
    } catch (err) {
      const errorMsg = `게시물(ID: ${id})을 불러오는데 실패했습니다.`
      toastStore.showToast(errorMsg, 'error')
      throw err
    }
  }

  const formatDate = (timestamp) => {
    const date = new Date(parseInt(timestamp))
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}. ${month}. ${day}`
  }

  const createPost = async (postData) => {
    const toastStore = useToastStore()
    loading.value = true
    error.value = null

    try {
      const newPost = {
        ...postData,
        createdAt: Date.now().toString(),
      }
      const response = await axios.post(API_URL, newPost)
      posts.value.push(response.data)
      return response.data
    } catch (err) {
      error.value = err.message || '게시물 등록에 실패했습니다.'
      toastStore.showToast(error.value, 'error')
      throw err
    } finally {
      loading.value = false
    }
  }

  const updatePost = async (id, postData) => {
    const toastStore = useToastStore()
    loading.value = true
    error.value = null

    try {
      const existingPost = await getPostById(id)
      const updatedPostData = {
        ...existingPost,
        ...postData,
        createdAt: existingPost.createdAt,
      }

      const response = await axios.put(`${API_URL}/${id}`, updatedPostData)

      const index = posts.value.findIndex((post) => post.id == id)
      if (index !== -1) {
        posts.value[index] = response.data
      }

      return response.data
    } catch (err) {
      error.value = err.message || '게시물 수정에 실패했습니다.'
      toastStore.showToast(error.value, 'error')
      throw err
    } finally {
      loading.value = false
    }
  }

  const deletePost = async (id) => {
    const toastStore = useToastStore()
    loading.value = true
    error.value = null

    try {
      await axios.delete(`${API_URL}/${id}`)
      posts.value = posts.value.filter((post) => post.id != id)
      return true
    } catch (err) {
      error.value = err.message || '게시물 삭제에 실패했습니다.'
      toastStore.showToast(error.value, 'error')
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    // state
    posts,
    loading,
    error,

    // getter
    getSortedPosts,

    // actions
    fetchPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    formatDate,
  }
})
