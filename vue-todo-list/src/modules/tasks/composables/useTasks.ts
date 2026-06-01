import type { Task } from "@/modules/tasks/types/tasks.types"
import { computed, onMounted } from "vue"
import useLocalStorageRef from "../../../shared/composables/useLocalStorageRef"

export default function useTasks() {
    const tasks = useLocalStorageRef<Task[]>('tasks', [])
    const language = useLocalStorageRef<string>('language', 'english')

    const activeTasksLength = computed(() => tasks.value.filter(t => t.isCompleted === false).length || 0)
    const completedTasksLength = computed(() => tasks.value.filter(t => t.isCompleted === true).length || 0)

    onMounted(() => {
        console.log('Первый рендер компонента App.vue')
    })

    function createTask(newTask: Task) {
        tasks.value.push(newTask)

        language.value = 'kazakh'
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

    return {
        tasks,
        activeTasksLength,
        completedTasksLength,
        createTask,
        returnTask,
        removeTask,
        completeTask
    }
}