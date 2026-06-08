<script setup lang="ts">
import useTaskDetails from '@/modules/tasks/composables/useTaskDetails';
import { TASK_PROVIDE_KEYS } from '@/modules/tasks/contants/tasks.constants';
import TaskCompleteButton from '@/modules/tasks/ui/TaskCompleteButton.vue';
import TaskRemoveButton from '@/modules/tasks/ui/TaskRemoveButton.vue';
import TaskReturnButton from '@/modules/tasks/ui/TaskReturnButton.vue';
import FullscreenSpinner from '@/shared/ui/FullscreenSpinner.vue';
import { onMounted, provide } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const { selectedTask, isLoading, completeTask, removeTask, returnTask, setSelectedTaskId } = useTaskDetails()

onMounted(() => {
  console.log(route.params)
  if (typeof route.params?.id === 'string') {
    setSelectedTaskId(route.params?.id)
  }
})

provide(TASK_PROVIDE_KEYS.task, selectedTask)
provide(TASK_PROVIDE_KEYS.completeTask, completeTask)
provide(TASK_PROVIDE_KEYS.removeTask, removeTaskLocal)
provide(TASK_PROVIDE_KEYS.returnTask, returnTask)

async function removeTaskLocal(id: string) {
  await removeTask(id)
  router.replace('/tasks')
}
</script>

<template>
  <div class="container">
    <h1>Детали задачи</h1>
    <p v-if="!Boolean(selectedTask)">
      Нет данных
    </p>
    <div class="text-container" v-if="Boolean(selectedTask)">
      <h2><span class="italic">Название:</span> {{ selectedTask?.title }}</h2>
      <p v-if="selectedTask?.description"><span class="italic">Описание:</span> <span class="text-bold">{{
        selectedTask?.description
          }}</span></p>
      <p><span class="italic">Статус:</span> <span
          :class="selectedTask?.completed ? 'completed text-bold' : 'active text-bold'">{{
            selectedTask?.completed ? 'Завершен' : 'Активный' }}</span></p>
      <div class="buttons-container" v-if="selectedTask">
        <TaskCompleteButton />
        <TaskReturnButton />
        <TaskRemoveButton />
      </div>
    </div>
    <FullscreenSpinner :is-loading="isLoading" />
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: 20px;
}

h1,
h2,
p {
  color: var(--main-green-color);
}

.italic {
  font-style: italic;
}

.text-bold {
  font-weight: 700;
}

.text-container {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.completed {
  color: rgb(28, 164, 28);
}

.active {
  color: rgb(164, 130, 28);
}

.buttons-container {
  display: flex;
  gap: 10px;
}
</style>
