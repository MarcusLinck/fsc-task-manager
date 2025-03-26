import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['updateTaskById', taskId],
    mutationFn: async (data) => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        return toast.error(
          'Erro ao atualizar a tarefa. Por favor tente novamente'
        )
      }
      const updateTask = await response.json()
      return updateTask
    },
    onSuccess: (updateTask) => {
      queryClient.setQueryData('tasks', (oldTasks) => {
        return oldTasks.map((oldTask) => {
          if (oldTask.id === updateTask.id) {
            return updateTask
          }
          return oldTask
        })
      })
    },
  })
}
