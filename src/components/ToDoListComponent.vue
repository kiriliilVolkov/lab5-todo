<template>
  <div v-if="store.isEmpty" class="empty">Список пуст</div>

  <TransitionGroup name="list" tag="div">
    <TodoItem
      v-for="todo in store.todos"
      :key="todo.id"
      :todo="todo"
    />
  </TransitionGroup>
</template>

<script setup lang="ts">
import { useTodoStore } from '../utils/useTodoStore'
import TodoItem from './ToDoItemComponent.vue'

const store = useTodoStore()
</script>

<style scoped>
.empty {
  text-align: center;
  color: #999;
  padding: 40px;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
