<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import TaskItem from './components/tasks/TaskItem.vue';
import type { Task } from './types/tasks.types';
import TaskForm from './components/tasks/TaskForm.vue';

const testRef = ref('Hello')
const tasks = ref<Task[]>([])

const activeTasksLength = computed(() => tasks.value.filter(t => t.isCompleted === false).length || 0)
const completedTasksLength = computed(() => tasks.value.filter(t => t.isCompleted === true).length || 0)

onMounted(() => {
  console.log('Первый рендер компонента App.vue')
  const lsTasksJson = localStorage.getItem('tasks')

  if (lsTasksJson) {
    tasks.value = JSON.parse(lsTasksJson)
  }
})

watch(tasks, () => {
  localStorage.setItem('tasks', JSON.stringify(tasks.value))
}, { deep: true }) // immediate: true - запусти даже при первом рендере

watch(testRef, () => {
  console.log(testRef.value)
})

// watchEffect(() => {
//   localStorage.setItem('tasks', JSON.stringify(tasks.value))
// })

function createTask(newTask: Task) {
  tasks.value.push(newTask)
  testRef.value = 'Hi'
}

function removeTask(id: string) {
  tasks.value = tasks.value.filter(t => t.id !== id)
}

function completeTask(id: string) {
  const taskToComplete = tasks.value.find(t => t.id === id)

  if (taskToComplete) {
    taskToComplete.isCompleted = true
  }
}

function returnTask(id: string) {
  const taskToComplete = tasks.value.find(t => t.id === id)

  if (taskToComplete) {
    taskToComplete.isCompleted = false
  }
}

</script>

<template>
  <main class="container">
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
        <TaskItem v-for="task in tasks.toReversed()" v-bind:key="task.id" :task="task" @complete-task="completeTask"
          @remove-task="removeTask" @return-task="returnTask" />
      </ul>
    </section>
  </main>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin-inline: auto;
  padding: 30px 10px;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-section h1 {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 800;
  color: #223125;
}

.tasks-section {
  margin-top: 40px;
}

/* tasks section */
.no-tasks-text {
  text-align: center;
  color: #223125;
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
  color: #223125;
}
</style>
