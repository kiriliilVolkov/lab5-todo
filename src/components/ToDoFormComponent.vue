<template>
  <form @submit.prevent="handleSubmit" class="form">
    <input
      v-model="text"
      placeholder="Что нужно сделать?"
      class="input"
    />
    <button type="submit">Добавить</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTodoStore } from '../utils/useTodoStore'

const store = useTodoStore()
const text = ref('')

const handleSubmit = () => {
  if (text.value.trim()) {
    store.addTodo(text.value)
    text.value = ''
  }
}
</script>

<style scoped>
.form {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}
</style>
