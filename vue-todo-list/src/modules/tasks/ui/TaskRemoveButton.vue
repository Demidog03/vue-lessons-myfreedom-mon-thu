<script setup lang="ts">
import { inject } from 'vue';
import type { Task } from '../types/tasks.types';
import { TASK_PROVIDE_KEYS } from '../contants/tasks.constants';

const task = inject<Task>(TASK_PROVIDE_KEYS.task)
const removeTask = inject<(id: string) => void>(TASK_PROVIDE_KEYS.removeTask)
</script>

<template>
  <button @click="() => (removeTask && task) && removeTask(task.id)" class="task-remove-btn">Удалить</button>
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

.task-remove-btn {
  background-color: rgb(183, 25, 25);
}
</style>
