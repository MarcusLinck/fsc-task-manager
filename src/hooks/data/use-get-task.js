import { useQuery } from '@tanstack/react-query'

import { taskQueryKeys } from '../../keys/queries'
import { api } from '../../lib/axios'

export const useGetTask = ({ taskId, onSuccess }) => {
  return useQuery({
    queryKey: taskQueryKeys.getOneTask(taskId),
    queryFn: async () => {
      const { data } = await api.get(`/tasks/${taskId}`)

      onSuccess(data)
      return data
    },
  })
}
