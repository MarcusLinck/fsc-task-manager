import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

export const useAddTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: 'addTask',
    mutationFn: async (newTask) => {
      const { data: createdTask } = await axios.post(
        'http://localhost:3000/tasks',
        newTask
      )
      return createdTask
    },
    onSuccess: (createdTask) => {
      queryClient.setQueryData('tasks', (oldTasks) => {
        return [...oldTasks, createdTask]
      })
    },
  })
}
