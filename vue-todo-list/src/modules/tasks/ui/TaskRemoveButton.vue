<script setup lang="ts">
import { inject } from 'vue';
import type { Task } from '../types/tasks.types';
import { TASK_PROVIDE_KEYS } from '../contants/tasks.constants';
import useRemoveTaskMutation from '../queries/useRemoveTaskMutation';
import { useRouter } from 'vue-router';

defineProps<{
  redirectUrl?: string
}>()

const router = useRouter()

const task = inject<Task>(TASK_PROVIDE_KEYS.task)
const { mutate: removeTask } = useRemoveTaskMutation()
</script>

<template>
  <button @click="() => {
    if (task) {
      removeTask(task.id)
      if (redirectUrl) {
        router.replace(redirectUrl)
      }
    }
  }" class="task-remove-btn">Удалить</button>
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
