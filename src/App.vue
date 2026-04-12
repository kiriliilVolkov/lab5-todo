<script setup lang="ts">
import { ref } from 'vue'
import TodoComponents from './components/TodoComponents.vue'
const show = ref(false)
</script>

<template>
  <div class="howwer">
    <div style="display: flex">
      <h1></h1>
      <button @click="show = !show">Todo</button>
    </div>
    <TodoComponents v-if="show" />
  </div>
</template>

<style scoped>
* {
  color: #000;
}
.howwer {
  background-color: rgb(46, 46, 46);
  border-radius: 20px;
  padding: 10px;
  align-items: center;
  justify-content: center;
}

.howwer button {
  background-color: rgb(46, 46, 46);
  border: 1px solid;
  border-radius: 20px;
}
</style>
