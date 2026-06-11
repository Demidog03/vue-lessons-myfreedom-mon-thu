import { useMutation, useQueryClient } from "@tanstack/vue-query";
import tasksApi from "../api/tasks.api";
import type { CreateTaskBody } from "../api/tasks.api.types";

export default function useCreateTaskMutation() {
  const query = useQueryClient()

  return useMutation({
    mutationKey: ['create-task'],
    mutationFn: (body: CreateTaskBody) => tasksApi.createTask(body),
    onSuccess: () => {
      // Описываем действия которые будут происходить после успешного запрос (createTask)
      query.invalidateQueries({ queryKey: ['get-tasks'] }) // переотправь запрос getTasks
    }
  })
}
