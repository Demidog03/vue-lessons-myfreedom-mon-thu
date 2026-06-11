import { useMutation, useQueryClient } from "@tanstack/vue-query";
import tasksApi from "../api/tasks.api";

export default function useRemoveTaskMutation() {
  const query = useQueryClient()

  return useMutation({
    mutationKey: ['remove-task'],
    mutationFn: (id: string) => tasksApi.removeTask(id),
    onSuccess: () => {
      // Описываем действия которые будут происходить после успешного запрос (removeTask)
      query.invalidateQueries({ queryKey: ['get-tasks'] }) // переотправь запрос getTasks
      query.invalidateQueries({ queryKey: ['get-task-details'] }) // переотправь запрос getTaskDetails
    }
  })
}
