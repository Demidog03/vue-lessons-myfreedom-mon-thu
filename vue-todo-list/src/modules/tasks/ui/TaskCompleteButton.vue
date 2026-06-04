<script setup lang="ts">
import { inject } from 'vue';
import type { Task } from '../types/tasks.types';
import { TASK_PROVIDE_KEYS } from '../contants/tasks.constants';

const task = inject<Task>(TASK_PROVIDE_KEYS.task)
const completeTask = inject<(id: string) => void>(TASK_PROVIDE_KEYS.completeTask)
</script>

<template>
  <button v-if="task?.isCompleted === false" @click="() => (completeTask && task) && completeTask(task.id)"
    class="task-active-btn">Выполнить</button>
</template>

<style scoped>
button {
  border: none;
  color: white;
  padding: 7px;
  font-weight: 700;
  border-radius: 7px;
  cursor: pointer;
}

.task-active-btn {
  background-color: #9c7233;
}
</style>
