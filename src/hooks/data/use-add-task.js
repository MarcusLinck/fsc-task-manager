import { useMutation, useQueryClient } from '@tanstack/react-query'

import { taskQueryKeys } from '../../keys/queries'
import { api } from '../../lib/axios'

export const useAddTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: 'addTask',
    mutationFn: async (newTask) => {
      const { data: createdTask } = await api.post('/tasks', newTask)
      return createdTask
    },
    onSuccess: (createdTask) => {
      queryClient.setQueryData(taskQueryKeys.getAllTasks(), (oldTasks) => {
        return [...oldTasks, createdTask]
      })
    },
  })
}
