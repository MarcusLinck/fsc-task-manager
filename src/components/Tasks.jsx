import Button from './Button.jsx'
import TasksSeparator from './TasksSeparator.jsx'
import TaskItem from './TaskItem.jsx'
import {
  AddIcon,
  TrashIcon,
  SunIcon,
  CloudSunIcon,
  MoonIcon,
} from '../assets/icons/index.js'
import { useState } from 'react'
import TASKS from '../constants/tasks.js'

const Tasks = () => {
  const [tasks, setTasks] = useState(TASKS)

  const morningTasks = tasks.filter((task) => task.time === 'morning')
  const afternoonTasks = tasks.filter((task) => task.time === 'afternoon')
  const eveningTasks = tasks.filter((task) => task.time === 'evening')

  const handleTaskCheckboxClick = (taskId) => {
    console.log('taskId', taskId)
    const newTasks = tasks.map((task) => {
      if (task.id !== taskId) {
        return task
      }
      if (task.status === 'not_started') {
        return { ...task, status: 'in_progress' }
      }
      if (task.status === 'in_progress') {
        return { ...task, status: 'done' }
      }
      if (task.status === 'done') {
        return { ...task, status: 'not_started' }
      }
      return task
    })
    setTasks(newTasks)
  }

  //   const handleTaskCheckboxClick = (currentTask) => {
  //     const UpdateTasksStatus = tasks.map((task) => {
  //       if (task.id === currentTask.id) {
  //         const statusMap = {
  //           done: 'not_started',
  //           not_started: 'in_progress',
  //           in_progress: 'done',
  //         }
  //         return { ...task, status: statusMap[task.status] }
  //       }
  //       return task
  //     })
  //     setTasks(UpdateTasksStatus)
  //   }

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <div className="flex w-full justify-between">
        <div>
          <span className="text-xs font-semibold text-[#00ADB5]">
            Minhas tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas Tarefas</h2>
        </div>

        <div className="items flex gap-3">
          <Button variant="ghost">
            Limpar tarefa
            <TrashIcon />
          </Button>
          <Button>
            Nova tarefa
            <AddIcon />
          </Button>
        </div>
      </div>

      <div className="rounde-xl bg-white p-6">
        <div className="space-y-3">
          <TasksSeparator title="Manhã" icon={<SunIcon />} />

          {morningTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleTaskCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>
        <div className="my-6 space-y-3">
          <TasksSeparator title="Tarde" icon={<CloudSunIcon />} />
          {afternoonTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleTaskCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>
        <div className="space-y-3">
          <TasksSeparator title="Noite" icon={<MoonIcon />} />
          {eveningTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleTaskCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tasks
