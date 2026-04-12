<template>
  <div>
    <h3>list tasks</h3>

    <div>
      <input type="text" v-model="newTaskValue" placeholder="input task" @keyup.enter="addTask" />
      <button @click="addTask">add</button>
    </div>

    <ul v-if="tasks.length > 0">
      <li v-for="task in tasks" :key="task.id" :class="{ completed: task.complete }">
        <input type="checkbox" v-model="task.complete" />
        <span>{{ task.text }}</span>
        <button @click="deleteTask(task.id)">x</button>
      </li>
    </ul>

    <p v-else>no tasks</p>

    <div class="stats" v-if="tasks.length > 0">
      <p>tasks: {{ tasks.length }} | complete: {{ completedCount }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import useLocalStorage from '@/utils/useLocalStorage'

interface Task {
  id: string
  text: string
  complete: boolean
}

const { items: tasks, addItem } = useLocalStorage('tasks')
const newTaskValue = ref<string>('')

// Вычисляем количество выполненных задач
const completedCount = computed(() => {
  return tasks.value.filter((task: Task) => task.complete).length
})

const addTask = () => {
  if (newTaskValue.value.trim()) {
    addItem({
      id: Date.now().toString(),
      text: newTaskValue.value,
      complete: false,
    })
    newTaskValue.value = ''
  }
}

const deleteTask = (taskId: string) => {
  const index = tasks.value.findIndex((task: Task) => task.id === taskId)
  if (index !== -1) {
    tasks.value.splice(index, 1)
  }
}
</script>

<style scoped>
button {
  background-color: rgb(46, 46, 46);
  border: 1px solid;
  border-radius: 10px;
}

button:hover {
  background-color: rgb(63, 63, 63);
}

input {
  background-color: rgb(46, 46, 46);
  border-radius: 20px;
  outline: none;
  border: 1px solid;
}
</style>
