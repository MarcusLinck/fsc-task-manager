import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

export const useGetTask = (taskId) => {
  console.log('entrei', taskId)
  const { reset } = useForm()
  return useQuery({
    queryKey: ['task', taskId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'GET',
      })
      const data = await response.json()
      reset(data)
    },
  })
}
