type TaskType = 'email'

interface Task<T = any> {
  id: number
  type: TaskType
  message: T
}


export type { Task, TaskType }