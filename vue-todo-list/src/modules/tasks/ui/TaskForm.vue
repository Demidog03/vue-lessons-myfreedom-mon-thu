<script setup lang="ts">
import { computed, ref } from 'vue';
import useCreateTaskMutation from "../queries/useCreateTaskMutation";

// two-way binding - двухстороннее привязка
const taskInput = ref<string>('') // реактивная переменная
const taskDescription = ref<string>('')

const { mutate: createTask } = useCreateTaskMutation()

const isInputEmpty = computed(() => !taskInput.value.trim())

function createTaskLocal() {
  // '     fdsfds   '.trim() => 'fdsfds' => '        '.trim() => ''
  if (!taskInput.value.trim()) { // '' => falsy value
    alert('Пожалуйста заполните поле!')
    return
  }

  createTask({
    title: taskInput.value.trim(),
    description: taskDescription.value.trim() || null,
  })

  taskInput.value = '' // меняем реактивную переменную - ререндер произошел
  taskDescription.value = ''
}

</script>

<template>
  <form @submit.prevent="createTaskLocal" class="todo-form">
    <input v-model="taskInput" type="text" placeholder="Начните писать название новой задачи...">
    <textarea rows="5" v-model="taskDescription" placeholder="Введите описание задачи..." />
    <button :disabled="isInputEmpty" type="submit">Создать</button>
  </form>
</template>

<style scoped>
.todo-form {
  display: flex;
  gap: 10px;
  flex-direction: column;
}

.todo-form input,
.todo-form textarea {
  width: 100%;
  background-color: #E6E7EB;
  font-size: 1.5rem;
  padding: 10px 20px;
  border: 0;
  outline: 0;
  border-radius: 10px;
  font-weight: 600;
}

.todo-form textarea {
  font-size: 1.25rem;
  resize: none;
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
  align-self: flex-end;
}

.todo-form button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
