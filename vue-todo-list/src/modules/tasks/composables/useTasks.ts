import type { Task } from "@/modules/tasks/types/tasks.types"
import { computed, onMounted, ref } from "vue"
import tasksApi from "../api/tasks.api"

export default function useTasks() {
  const tasks = ref<Task[]>([])
  const isLoading = ref<boolean>(false)

  const activeTasksLength = computed(() => tasks.value.filter(t => t.completed === false).length || 0)
  const completedTasksLength = computed(() => tasks.value.filter(t => t.completed === true).length || 0)

  onMounted(async () => {
    await getTasks()
  })

  function startLoading() {
    isLoading.value = true
  }

  function stopLoading() {
    isLoading.value = false
  }

  async function getTasks() {
    try {
      startLoading()
      // При первом рендере пытаемся получить данные с сервера и присвоить к реактивному массиву
      const data = await tasksApi.getTasks()
      tasks.value = data.data
    }
    finally {
      stopLoading()
    }
  }

  async function createTask(newTask: Task) {
    try {
      startLoading()
      await tasksApi.createTask({
        title: newTask.title,
        description: newTask.description
      })
    }
    finally {
      stopLoading()
    }

    await getTasks()
  }

  async function removeTask(id: string) {
    try {
      startLoading()
      await tasksApi.removeTask(id)
    }
    finally {
      stopLoading()
    }

    await getTasks()
  }

  async function completeTask(id: string) {
    try {
      startLoading()
      await tasksApi.changeTaskStatus(id, true)
    }
    finally {
      stopLoading()
    }

    await getTasks()
  }

  async function returnTask(id: string) {
    try {
      startLoading()
      await tasksApi.changeTaskStatus(id, false)
    }
    finally {
      stopLoading()
    }

    await getTasks()
  }

  return {
    tasks,
    activeTasksLength,
    completedTasksLength,
    isLoading,
    createTask,
    returnTask,
    removeTask,
    completeTask,
  }
}
