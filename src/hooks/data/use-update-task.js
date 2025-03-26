import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['updateTaskById', taskId],
    mutationFn: async (newTask) => {
      const { data: updateTask } = await axios.patch(
        `http://localhost:3000/tasks/${taskId}`,
        newTask
      )

      queryClient.setQueryData('tasks', (oldTasks) => {
        return oldTasks.map((oldTask) => {
          if (oldTask.id === taskId) {
            return updateTask
          }
          return oldTask
        })
      })
    },
  })
}
