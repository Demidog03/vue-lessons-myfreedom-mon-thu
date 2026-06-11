<script setup lang="ts">
import useGetTasksQuery from '@/modules/tasks/queries/useGetTasksQuery';
import type { Task } from '@/modules/tasks/types/tasks.types';
import TaskForm from '@/modules/tasks/ui/TaskForm.vue';
import TaskItem from '@/modules/tasks/ui/TaskItem.vue';
import FullscreenSpinner from '@/shared/ui/FullscreenSpinner.vue';
import RouterButton from '@/shared/ui/RouterButton.vue';
import { computed } from 'vue';

const { data: tasks, isLoading, } = useGetTasksQuery()

const activeTasksLength = computed(() => tasks.value.filter((t: Task) => t.completed === false).length || 0)
const completedTasksLength = computed(() => tasks.value.filter((t: Task) => t.completed === true).length || 0)

</script>

<template>
  <main class="container">
    <RouterLink to="/test">Перейти на тестовую страницу</RouterLink>
    <RouterButton to="/test" text="Перейти на тестовую страницу" />
    <section class="form-section">
      <h1>Todo App</h1>
      <TaskForm />
    </section>
    <section class="tasks-section">
      <p class="tasks-amount-task">Количество задач: {{ activeTasksLength }} активные, {{ completedTasksLength }}
        завершенные</p>
      <p v-if="tasks?.length <= 0" class="no-tasks-text">Нет задач...</p>
      <ul v-if="tasks?.length > 0" class="tasks-list">
        <!-- v-for - директива для маппинга элементов -->
        <TaskItem v-for="task in tasks" v-bind:key="task.id" :task="task" />
      </ul>
    </section>
    <FullscreenSpinner :is-loading="isLoading" />
    <!-- <button @click="refetch">refetch</button> -->
  </main>
</template>

<style scoped>
.form-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-section h1 {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--main-green-color);
}

.tasks-section {
  margin-top: 40px;
}

/* tasks section */
.no-tasks-text {
  text-align: center;
  color: var(--main-green-color);
  font-size: 1.25rem;
  font-weight: 600;
  opacity: 0.5;
}


.tasks-list {
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.tasks-amount-task {
  margin-bottom: 20px;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--main-green-color);
}
</style>
