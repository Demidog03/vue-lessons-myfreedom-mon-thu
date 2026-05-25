<script setup lang="ts">
import { v4 as uuidv4 } from "uuid";
import type { Task } from '@/types/tasks.types';
import { computed, ref } from 'vue';

const emits = defineEmits<{
    createTask: [task: Task]
}>()

// two-way binding - двухстороннее привязка
const taskInput = ref<string>('') // реактивная переменная

const isInputEmpty = computed(() => !taskInput.value.trim())

function createTaskLocal() {
    // '     fdsfds   '.trim() => 'fdsfds' => '        '.trim() => ''
    if (!taskInput.value.trim()) { // '' => falsy value
        alert('Пожалуйста заполните поле!')
        return
    }

    const newTask: Task = {
        id: uuidv4(),
        title: taskInput.value.trim(),
        isCompleted: false
    }

    emits('createTask', newTask)

    taskInput.value = '' // меняем реактивную переменную - ререндер произошел
}

</script>

<template>
    <form @submit.prevent="createTaskLocal" class="todo-form">
        <input v-model="taskInput" type="text" placeholder="Начните писать название новой задачи...">
        <button :disabled="isInputEmpty" type="submit">Создать</button>
    </form>
</template>

<style scoped>
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

.todo-form button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}
</style>