<script setup>
import Header from "./components/Header.vue";
import ProgressBar from "./components/ProgressBar.vue";
import TodoInput from "./components/TodoInput.vue";
import TodoList from "./components/TodoList.vue";
import { ref, computed, onMounted } from "vue";

// 할일 리스트 선언
const todos = ref([]);

// 로컬 스토리지에서 데이터 불러오기
onMounted(() => {
  const saveTodos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.value = saveTodos;
});

// 완료된 할 일 개수
const completedCount = computed(() => {
  return todos.value.filter((todo) => todo.done).length;
});
// 전체 할 일 개수
const totalCount = computed(() => {
  return todos.value.length;
});

// 할 일 추가
const addTodo = (text) => {
  // todos.value.push({ ...todos.value, done: false });
  todos.value = [...todos.value, { text: text, done: false }];
  updateLocalStorage();
};

// 할 일 상태 변경
const toggleTodo = (index) => {
  todos.value[index].done = !todos.value[index].done;
  updateLocalStorage();
};

// 로컬 스토리지 업데이트
const updateLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todos.value));
};

// 할일 삭제
const removeTodo = (index) => {
  todos.value.splice(index, 1);
  updateLocalStorage();
};

// 전체 삭제 함수
const removeAll = () => {
  todos.value = [];
  localStorage.removeItem("todos");
};
</script>

<template>
  <section class="container">
    <Header></Header>
    <ProgressBar :completed="completedCount" :total="totalCount"></ProgressBar>
    <TodoList
      :todos="todos"
      @toggle="toggleTodo"
      @remove="removeTodo"
    ></TodoList>
    <TodoInput @add="addTodo" @removeAll="removeAll"></TodoInput>
  </section>
</template>

<style scoped>
.container {
  width: 80%;
  max-width: 400px;
  margin: 50px auto;
  background-color: #f1f0f7;
  -webkit-box-shadow: 9px 11px 5px 0px rgba(125, 124, 125, 1);
  -moz-box-shadow: 9px 11px 5px 0px rgba(125, 124, 125, 1);
  box-shadow: 9px 11px 5px 0px rgba(125, 124, 125, 1);
  border-radius: 20px;
}
</style>
