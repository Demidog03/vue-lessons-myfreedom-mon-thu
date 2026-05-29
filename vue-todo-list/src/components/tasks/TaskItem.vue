<script setup lang="ts">
import type { Task } from '@/types/tasks.types';
import { onUnmounted } from 'vue';

const props = defineProps<{
    task: Task,
}>()

const emits = defineEmits<{
    completeTask: [id: string],
    returnTask: [id: string],
    removeTask: [id: string],
}>()

onUnmounted(() => {
    console.log(`task item - ${props.task.id} умер`)
})
</script>

<template>
    <li :class="task.isCompleted ? 'completed' : 'active'">
        <span>{{ task.title }}</span>
        <div class="buttons-container">
            <!-- conditional render - отрисовка по условию -->
            <button v-if="task.isCompleted === false" @click="emits('completeTask', task.id)"
                class="task-active-btn">Выполнить</button>
            <button v-if="task.isCompleted === true" @click="emits('returnTask', task.id)"
                class="task-completed-btn">Выполнено</button>
            <button @click="emits('removeTask', task.id)" class="task-remove-btn">Удалить</button>
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
}

.tasks-list li.completed {
    background-color: #99ce99;
}

.tasks-list li.active {
    background-color: #A1C0C2;
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
</style>