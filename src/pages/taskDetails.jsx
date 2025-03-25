import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Sidebar from '../components/Sidebar'

const TaskDetailsPage = () => {
  const { taskId } = useParams()
  const [task, setTask] = useState()

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'GET',
      })
      const data = await response.json()
      console.log(data)
      setTask(data)
    }
    fetchTask()
  }, [taskId])

  return (
    <div>
      <Sidebar />
      <h1>{task?.title}</h1>
    </div>
  )
}

export default TaskDetailsPage
