import { useMutation, useQueryClient } from "@tanstack/vue-query";
import tasksApi from "../api/tasks.api";

export default function useCompleteTaskMutation() {
  const query = useQueryClient()

  return useMutation({
    mutationKey: ['complete-task'],
    mutationFn: (id: string) => tasksApi.changeTaskStatus(id, true),
    onSuccess: () => {
      // Описываем действия которые будут происходить после успешного запрос (completeTask)
      query.invalidateQueries({ queryKey: ['get-tasks'] }) // переотправь запрос getTasks
      query.invalidateQueries({ queryKey: ['get-task-details'] }) // переотправь запрос getTaskDetails
    }
  })
}
