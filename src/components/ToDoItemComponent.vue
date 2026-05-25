<template>
  <div class="item" :class="{ done: todo.completed }">
    <input
      type="checkbox"
      :checked="todo.completed"
      @change="store.toggleTodo(todo.id)"
    />

    <span v-if="!isEditing" @dblclick="startEdit" class="text">
      {{ todo.text }}
    </span>

    <input
      v-else
      v-model="editText"
      @keyup.enter="saveEdit"
      @keyup.esc="cancelEdit"
      @blur="saveEdit"
      ref="editInput"
      class="edit-input"
    />

    <button @click="store.deleteTodo(todo.id)" class="delete">×</button>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { useTodoStore, type Todo } from '../utils/useTodoStore'

const props = defineProps<{ todo: Todo }>()
const store = useTodoStore()

const isEditing = ref(false)
const editText = ref('')
const editInput = ref<HTMLInputElement | null>(null)

const startEdit = async () => {
  editText.value = props.todo.text
  isEditing.value = true
  await nextTick()
  editInput.value?.focus()
}

const saveEdit = () => {
  if (editText.value.trim() && editText.value !== props.todo.text) {
    store.editTodo(props.todo.id, editText.value)
  }
  isEditing.value = false
}

const cancelEdit = () => {
  isEditing.value = false
}
</script>

<style scoped>
.item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-bottom: 1px solid #eee;
  color: black;
}

.done .text {
  text-decoration: line-through;
  color: #999;
}

.text {
  flex: 1;
  cursor: pointer;
}

.edit-input {
  flex: 1;
  padding: 4px 8px;
  border: 1px solid #42b983;
  border-radius: 4px;
  font-size: 16px;
}

.delete {
  background: none;
  border: none;
  font-size: 20px;
  color: #999;
  padding: 0 4px;
}

.delete:hover {
  color: red;
}
</style>
