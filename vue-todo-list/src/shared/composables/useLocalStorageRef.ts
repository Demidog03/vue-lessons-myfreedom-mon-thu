import { ref, watch } from "vue";

export default function useLocalStorageRef<T>(key: string, defaultValue: T) {
    const data = ref<T>(loadInitialValue())

    function loadInitialValue(): T {
        const lsData = localStorage.getItem(key)

        if (!lsData) {
            return defaultValue
        }

        try {
            return JSON.parse(lsData)
        }
        catch {
            return defaultValue
        }
    }

    watch(data, () => {
        localStorage.setItem(key, JSON.stringify(data.value))
    }, { deep: true })

    return data
}

// useLocalStorageRef<Task>('task', defaultValue: Task)
// useLocalStorageRef<Task[]>('task', defaultValue: Task[])