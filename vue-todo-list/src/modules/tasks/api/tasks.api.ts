import axios from "axios";
import type { CreateTaskBody } from "./tasks.api.types";

async function getTasks() {
  const response = await axios.get('http://localhost:3000/tasks')
  return response.data
}

async function createTask(body: CreateTaskBody) {
  const response = await axios.post('http://localhost:3000/tasks', body)
  return response.data
}

async function removeTask(id: string) {
  const response = await axios.delete(`http://localhost:3000/tasks/${id}`)
  return response.data
}

async function changeTaskStatus(id: string, completed: boolean) {
  const response = await axios.patch(`http://localhost:3000/tasks/${id}/status`, {
    completed
  })
  return response.data
}

async function getTaskDetails(id: string) {
  const response = await axios.get(`http://localhost:3000/tasks/${id}`)
  return response.data
}

const tasksApi = {
  getTasks,
  createTask,
  removeTask,
  changeTaskStatus,
  getTaskDetails
}

export default tasksApi
