<script setup lang="ts">
import type { Task } from '@/modules/tasks/types/tasks.types';
import { onUnmounted, provide, toRef } from 'vue';
import { useRouter } from 'vue-router';
import TaskCompleteButton from './TaskCompleteButton.vue';
import TaskReturnButton from './TaskReturnButton.vue';
import TaskRemoveButton from './TaskRemoveButton.vue';
import { TASK_PROVIDE_KEYS } from '../contants/tasks.constants.ts';

const props = defineProps<{
  task: Task,
}>()

provide(TASK_PROVIDE_KEYS.task, toRef(props, 'task'))

const router = useRouter()

onUnmounted(() => {
  console.log(`task item - ${props.task.id} умер`)
})

function goToTaskDetailsPage() {
  router.push(`/tasks/${props.task.id}`)
}

</script>

<template>
  <li @click.self="goToTaskDetailsPage" :class="task.completed ? 'completed' : 'active'">
    <span>{{ task.title }}</span>
    <div class="buttons-container">
      <!-- conditional render - отрисовка по условию -->
      <TaskCompleteButton />
      <TaskReturnButton />
      <TaskRemoveButton />
    </div>
  </li>
</template>

<style scoped>
.tasks-list li {
  background-color: #A1C0C2;
  font-size: 1.3rem;
  font-weight: 700;
  padding: 10px 20px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.tasks-list li.completed {
  background-color: #99ce99;
}

.tasks-list li.completed:hover {
  background-color: #89ae89;
}

.tasks-list li.active {
  background-color: #A1C0C2;
}

.tasks-list li.active:hover {
  background-color: #7d9c9e;
}

.buttons-container {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
