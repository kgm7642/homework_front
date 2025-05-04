import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useToastStore = defineStore('toast', () => {
  const message = ref('') // 토스트 메시지
  const type = ref('success') //
  const isVisible = ref(false) // 토스트가 보이는지 여부
  let timer = null // 자동 사라짐용 타이머머

  const showToast = (newMessage, newType = 'success', duration = 2000) => {
    if (timer) {
      clearTimeout(timer)
    }

    message.value = newMessage
    type.value = newType
    isVisible.value = true

    timer = setTimeout(() => {
      isVisible.value = false
      timer = null
    }, duration)
  }

  const hideToast = () => {
    isVisible.value = false
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  return { message, type, isVisible, showToast, hideToast }
})
