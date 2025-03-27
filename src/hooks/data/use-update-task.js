import { useMutation, useQueryClient } from '@tanstack/react-query'

import { taskQueryKeys } from '../../keys/queries'
import { api } from '../../lib/axios'

export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['updateTaskById', taskId],
    mutationFn: async (newTask) => {
      const { data: updateTask } = await api.patch(`/tasks/${taskId}`, newTask)

      queryClient.setQueryData(taskQueryKeys.getAllTasks(), (oldTasks) => {
        return oldTasks.map((oldTask) => {
          if (oldTask.id === taskId) {
            return updateTask
          }
          return oldTask
        })
      })
      queryClient.setQueryData(taskQueryKeys.getOneTask(taskId), updateTask)
    },
  })
}
