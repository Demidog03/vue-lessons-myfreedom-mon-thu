<script setup lang="ts">
import useTasks from '@/modules/tasks/composables/useTasks';
import TaskForm from '@/modules/tasks/ui/TaskForm.vue';
import TaskItem from '@/modules/tasks/ui/TaskItem.vue';
import RouterButton from '@/shared/ui/RouterButton.vue';

const { tasks, activeTasksLength, completedTasksLength, completeTask, createTask, removeTask, returnTask } = useTasks()
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
                <TaskItem v-for="task in tasks.toReversed()" v-bind:key="task.id" :task="task"
                    @complete-task="completeTask" @remove-task="removeTask" @return-task="returnTask" />
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
