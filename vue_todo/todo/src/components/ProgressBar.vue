<script setup>
defineProps({
  completed: Number,
  total: Number,
});
</script>

<template>
  <div class="progress-container">
    <p>
      완료: <span id="completed-count">{{ completed }}</span> / 총
      <span id="total-count">{{ total }}</span>
    </p>
    <progress id="progress-bar" :value="completed" :max="total"></progress>
  </div>
</template>

<style scoped>
.progress-container {
  text-align: center;
  padding: 1rem;
}
</style>
