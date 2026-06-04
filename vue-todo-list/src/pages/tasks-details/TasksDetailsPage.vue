<script setup lang="ts">
import useTasks from '@/modules/tasks/composables/useTasks';
import { TASK_PROVIDE_KEYS } from '@/modules/tasks/contants/tasks.constants';
import TaskCompleteButton from '@/modules/tasks/ui/TaskCompleteButton.vue';
import TaskRemoveButton from '@/modules/tasks/ui/TaskRemoveButton.vue';
import TaskReturnButton from '@/modules/tasks/ui/TaskReturnButton.vue';
import { computed, onMounted, provide } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const { tasks, completeTask, removeTask, returnTask } = useTasks()
const task = computed(() => {
  const task = tasks.value.find(t => t.id === route.params.id)
  return task
})

onMounted(() => {
  console.log(route.params)
})

provide(TASK_PROVIDE_KEYS.task, task)
provide(TASK_PROVIDE_KEYS.completeTask, completeTask)
provide(TASK_PROVIDE_KEYS.removeTask, removeTaskLocal)
provide(TASK_PROVIDE_KEYS.returnTask, returnTask)

function removeTaskLocal(id: string) {
  removeTask(id)
  router.replace('/tasks')
}
</script>

<template>
  <div class="container">
    <h1>Детали задачи</h1>
    <p v-if="!Boolean(task)">
      Нет данных
    </p>
    <div class="text-container" v-if="Boolean(task)">
      <h2><span class="italic">Название:</span> {{ task?.title }}</h2>
      <p v-if="task?.description"><span class="italic">Описание:</span> <span class="text-bold">{{ task?.description
      }}</span></p>
      <p><span class="italic">Статус:</span> <span
          :class="task?.isCompleted ? 'completed text-bold' : 'active text-bold'">{{
            task?.isCompleted ? 'Завершен' : 'Активный' }}</span></p>
      <div class="buttons-container" v-if="task">
        <TaskCompleteButton />
        <TaskReturnButton />
        <TaskRemoveButton />
      </div>
    </div>
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
