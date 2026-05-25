import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export interface Todo {
  id: number
  text: string
  completed: boolean
  createdAt: Date
}

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<Todo[]>([])

  // Getters
  const remainingCount = computed(() =>
    todos.value.filter(t => !t.completed).length
  )

  const completedCount = computed(() =>
    todos.value.filter(t => t.completed).length
  )

  const hasCompleted = computed(() => completedCount.value > 0)
  const isEmpty = computed(() => todos.value.length === 0)

  // Автосохранение при изменениях
  watch(todos, () => {
    localStorage.setItem('todos', JSON.stringify(todos.value))
  }, { deep: true })

  // Инициализация
  const saved = localStorage.getItem('todos')
  if (saved) todos.value = JSON.parse(saved)

  // Actions
  const addTodo = (text: string) => {
    if (!text.trim()) return
    todos.value.unshift({
      id: Date.now(),
      text: text.trim(),
      completed: false,
      createdAt: new Date()
    })
  }

  const toggleTodo = (id: number) => {
    const todo = todos.value.find(t => t.id === id)
    if (todo) todo.completed = !todo.completed
  }

  const deleteTodo = (id: number) => {
    todos.value = todos.value.filter(t => t.id !== id)
  }

  const editTodo = (id: number, newText: string) => {
    const todo = todos.value.find(t => t.id === id)
    if (todo && newText.trim()) todo.text = newText.trim()
  }

  const clearCompleted = () => {
    todos.value = todos.value.filter(t => !t.completed)
  }

  return {
    todos, remainingCount, completedCount, hasCompleted, isEmpty,
    addTodo, toggleTodo, deleteTodo, editTodo, clearCompleted
  }
})
