<script setup lang="ts">
import { inject } from 'vue';
import type { Task } from '../types/tasks.types';
import { TASK_PROVIDE_KEYS } from '../contants/tasks.constants';
import useCompleteTaskMutation from '../queries/useCompleteTaskMutation';

const task = inject<Task>(TASK_PROVIDE_KEYS.task)
const { mutate: completeTask } = useCompleteTaskMutation()
</script>

<template>
  <button v-if="task?.completed === false" @click="() => task && completeTask(task.id)"
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
