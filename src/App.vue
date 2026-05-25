<script setup lang="ts">
import ToDoFormComponent from './components/ToDoFormComponent.vue'
import ToDoListComponent from './components/ToDoListComponent.vue'
import { useTodoStore } from './utils/useTodoStore'

const store = useTodoStore()
</script>

<template>
  <div class="app">
    <h1>Задачи</h1>
    <ToDoFormComponent />
    <ToDoListComponent />
    <div v-if="!store.isEmpty" class="footer">
      <span>{{ store.remainingCount }} осталось</span>
      <button v-if="store.hasCompleted" @click="store.clearCompleted()">
        Очистить готовые
      </button>
    </div>
  </div>
</template>

<style>
body {
  font-family: system-ui, sans-serif;
  background: #f5f5f5;
  margin: 0;
  padding: 20px;
}

.app {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  color: black;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding: 10px 0;
  border-top: 1px solid #ddd;
  font-size: 14px;
}

button {
  cursor: pointer;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
}
</style>
