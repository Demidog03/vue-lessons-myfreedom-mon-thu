<script setup lang="ts">
import { computed, ref } from 'vue';
import { v4 as uuidv4 } from "uuid";

interface Task {
  id: string
  title: string
  isCompleted: boolean
}

// two-way binding - двухстороннее привязка
const taskInput = ref<string>('') // реактивная переменная
const tasks = ref<Task[]>([
  {
    id: '1',
    title: 'Задача 1',
    isCompleted: false
  },
  {
    id: '2',
    title: 'Задача 2',
    isCompleted: true
  },
  {
    id: '3',
    title: 'Задача 3',
    isCompleted: false
  }
])

const activeTasksLength = computed(() => tasks.value.filter(t => t.isCompleted === false).length || 0)
const completedTasksLength = computed(() => tasks.value.filter(t => t.isCompleted === true).length || 0)

function createTask() {
  const newTask: Task = {
    id: uuidv4(),
    title: taskInput.value,
    isCompleted: false
  }

  tasks.value.push(newTask)
  // taskInput.value = 'Владимир'

  taskInput.value = '' // меняем реактивную переменную - ререндер произошел
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
      <form @submit.prevent="createTask" class="todo-form">
        <input v-model="taskInput" type="text" placeholder="Начните писать название новой задачи...">
        <button type="submit">Создать</button>
      </form>
    </section>
    <section class="tasks-section">
      <p class="tasks-amount-task">Количество задач: {{ activeTasksLength }} активные, {{ completedTasksLength }} завершенные</p>
      <ul class="tasks-list">
        <!-- v-for - директива для маппинга элементов -->
        <li v-for="(task, index) in tasks.toReversed()" v-bind:key="index">
          <span>{{ task.title }}</span>
          <div class="buttons-container">
            <!-- conditional render - отрисовка по условию -->
            <button v-if="task.isCompleted === false" @click="completeTask(task.id)" class="task-active-btn">Выполнить</button>
            <button v-if="task.isCompleted === true" @click="returnTask(task.id)" class="task-completed-btn">Выполнено</button>
            <button @click="removeTask(task.id)" class="task-remove-btn">Удалить</button>
          </div>
        </li>
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

.todo-form {
  display: flex;
  gap: 10px;
}

.todo-form input {
  width: 100%;
  background-color: #E6E7EB;
  font-size: 1.5rem;
  padding: 10px 20px;
  border: 0;
  outline: 0;
  border-radius: 10px;
  font-weight: 600;
}

.todo-form button {
  border: 0;
  background-color: #729969;
  color: white;
  font-weight: 700;
  font-size: 1.3rem;
  padding: 10px 15px;
  border-radius: 10px;
  cursor: pointer;
}

.tasks-section {
  margin-top: 40px;
}

/* tasks section */
.tasks-list {
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.tasks-list li {
  background-color: #A1C0C2;
  font-size: 1.3rem;
  font-weight: 700;
  padding: 10px 20px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.buttons-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.tasks-list li button {
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

.task-active-btn {
  background-color: #9c7233;
}

.task-completed-btn {
  background-color: #729969;
}

.tasks-amount-task {
  margin-bottom: 20px;
  font-size: 1.2rem;
  font-weight: 600;
  color: #223125;
}
</style>
