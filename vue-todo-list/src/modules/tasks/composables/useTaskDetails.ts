import { ref, watch } from "vue"
import type { Task } from "../types/tasks.types"
import tasksApi from "../api/tasks.api"

export default function useTaskDetails() {
  const selectedTask = ref<Task>()
  const selectedTaskId = ref<string>()
  const isLoading = ref<boolean>(false)

  watch(selectedTaskId, () => {
    getTaskDetails()
  })

  function startLoading() {
    isLoading.value = true
  }

  function stopLoading() {
    isLoading.value = false
  }

  function setSelectedTaskId(id?: string) {
    if (id) {
      selectedTaskId.value = id
    }
  }

  async function getTaskDetails() {
    if (selectedTaskId.value) {
      try {
        startLoading()
        const data = await tasksApi.getTaskDetails(selectedTaskId.value)
        selectedTask.value = data.data
      }
      finally {
        stopLoading()
      }
    }
  }

  async function removeTask(id: string) {
    try {
      startLoading()
      await tasksApi.removeTask(id)
    }
    finally {
      stopLoading()
    }
  }

  async function completeTask(id: string) {
    try {
      startLoading()
      await tasksApi.changeTaskStatus(id, true)
    }
    finally {
      stopLoading()
    }

    await getTaskDetails()
  }

  async function returnTask(id: string) {
    try {
      startLoading()
      await tasksApi.changeTaskStatus(id, false)
    }
    finally {
      stopLoading()
    }

    await getTaskDetails()
  }

  return {
    selectedTask,
    selectedTaskId,
    isLoading,
    setSelectedTaskId,
    removeTask,
    completeTask,
    returnTask
  }
}
