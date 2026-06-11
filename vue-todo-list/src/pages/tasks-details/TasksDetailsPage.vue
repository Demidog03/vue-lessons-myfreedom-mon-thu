<script setup lang="ts">
import { TASK_PROVIDE_KEYS } from '@/modules/tasks/contants/tasks.constants';
import useGetTaskDetailsQuery from '@/modules/tasks/queries/useGetTaskDetailsQuery';
import TaskCompleteButton from '@/modules/tasks/ui/TaskCompleteButton.vue';
import TaskRemoveButton from '@/modules/tasks/ui/TaskRemoveButton.vue';
import TaskReturnButton from '@/modules/tasks/ui/TaskReturnButton.vue';
import FullscreenSpinner from '@/shared/ui/FullscreenSpinner.vue';
import { provide } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const { data: selectedTask, isFetching } = useGetTaskDetailsQuery(typeof route.params?.id === 'string' ? route.params?.id : '')
// isLoading -> крути при первом запросе
// isFetchin -> крути всегда когда запрос отправляется
provide(TASK_PROVIDE_KEYS.task, selectedTask)

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
        <TaskRemoveButton :redirect-url="'/tasks'" />
      </div>
    </div>
    <FullscreenSpinner :is-loading="isFetching" />
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
