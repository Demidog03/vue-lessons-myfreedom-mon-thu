<script setup lang="ts">
import useTasks from '@/modules/tasks/composables/useTasks';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const { tasks } = useTasks()
const task = computed(() => {
    const task = tasks.value.find(t => t.id === route.params.id)
    return task
})

onMounted(() => {
    console.log(route.params)
})
</script>

<template>
    <h1>Детали задачи</h1>
    <p v-if="!Boolean(task)">
        Нет данных
    </p>
    <div v-if="Boolean(task)">
        <h2>Название: {{ task?.title }}</h2>
        <h2>Статус: {{ task?.isCompleted ? 'Завершен' : 'Активный' }}</h2>
    </div>
</template>

<style scoped></style>