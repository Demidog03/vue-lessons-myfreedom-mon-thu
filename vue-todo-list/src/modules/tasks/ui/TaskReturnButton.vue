<script setup lang="ts">
import { inject } from 'vue';
import type { Task } from '../types/tasks.types';
import { TASK_PROVIDE_KEYS } from '../contants/tasks.constants';

const task = inject<Task>(TASK_PROVIDE_KEYS.task)
const returnTask = inject<(id: string) => void>(TASK_PROVIDE_KEYS.returnTask)
</script>

<template>
  <button v-if="task?.completed === true" @click="() => (returnTask && task) && returnTask(task.id)"
    class="task-completed-btn">Выполнено</button>
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

.task-completed-btn {
  background-color: #729969;
}
</style>
