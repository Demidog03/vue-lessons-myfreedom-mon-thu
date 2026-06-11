import { useQuery } from "@tanstack/vue-query";
import tasksApi from "../api/tasks.api";

export default function useGetTasksQuery() {
  return useQuery({
    queryKey: ['get-tasks'],
    queryFn: tasksApi.getTasks,
    // refetchOnWindowFocus: false,
    // refetchInterval: 2000
  })
}
