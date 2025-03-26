import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useAddTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: 'addTask',
    mutationFn: async (newTask) => {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        body: JSON.stringify(newTask),
      })
      if (!response.ok) {
        return toast.error(
          'Erro ao adicionar a tarefa. Por favor tente novamente'
        )
      }
      const createdTask = await response.json()
      return createdTask
    },
    onSuccess: (createdTask) => {
      queryClient.setQueryData('tasks', (oldTasks) => {
        return [...oldTasks, createdTask]
      })
    },
  })
}
