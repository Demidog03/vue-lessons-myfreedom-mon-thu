<script setup lang="ts">
import useTasks from '@/modules/tasks/composables/useTasks';
import { TASK_PROVIDE_KEYS } from '@/modules/tasks/contants/tasks.constants';
import TaskForm from '@/modules/tasks/ui/TaskForm.vue';
import TaskItem from '@/modules/tasks/ui/TaskItem.vue';
import RouterButton from '@/shared/ui/RouterButton.vue';
import { provide } from 'vue';

const { tasks, activeTasksLength, completedTasksLength, completeTask, createTask, removeTask, returnTask } = useTasks()

provide(TASK_PROVIDE_KEYS.completeTask, completeTask)
provide(TASK_PROVIDE_KEYS.removeTask, removeTask)
provide(TASK_PROVIDE_KEYS.returnTask, returnTask)
</script>

<template>
  <main class="container">
    <RouterLink to="/test">Перейти на тестовую страницу</RouterLink>
    <RouterButton to="/test" text="Перейти на тестовую страницу" />
    <section class="form-section">
      <h1>Todo App</h1>
      <TaskForm @create-task="createTask" />
    </section>
    <section class="tasks-section">
      <p class="tasks-amount-task">Количество задач: {{ activeTasksLength }} активные, {{ completedTasksLength }}
        завершенные</p>
      <p v-if="tasks.length <= 0" class="no-tasks-text">Нет задач...</p>
      <ul v-if="tasks.length > 0" class="tasks-list">
        <!-- v-for - директива для маппинга элементов -->
        <TaskItem v-for="task in tasks.toReversed()" v-bind:key="task.id" :task="task" />
      </ul>
    </section>
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
