import { useMutation, useQueryClient } from "@tanstack/vue-query";
import tasksApi from "../api/tasks.api";

export default function useReturnTaskMutation() {
  const query = useQueryClient()

  return useMutation({
    mutationKey: ['return-task'],
    mutationFn: (id: string) => tasksApi.changeTaskStatus(id, false),
    onSuccess: () => {
      // Описываем действия которые будут происходить после успешного запрос (returnTask)
      query.invalidateQueries({ queryKey: ['get-tasks'] }) // переотправь запрос getTasks
      query.invalidateQueries({ queryKey: ['get-task-details'] }) // переотправь запрос getTaskDetails
    }
  })
}
