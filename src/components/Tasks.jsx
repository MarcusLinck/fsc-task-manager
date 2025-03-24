import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import {
  AddIcon,
  CloudSunIcon,
  MoonIcon,
  SunIcon,
  TrashIcon,
} from '../assets/icons/index.js'
import AddTaskDialog from './AddTaskDialog.jsx'
import Button from './Button.jsx'
import TaskItem from './TaskItem.jsx'
import TasksSeparator from './TasksSeparator.jsx'

const Tasks = () => {
  const [tasks, setTasks] = useState([])
  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false)

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'GET',
      })
      const tasks = await response.json()
      setTasks(tasks)
    }
    fetchTasks()
  }, [])

  const morningTasks = tasks.filter((task) => task.time === 'morning')
  const afternoonTasks = tasks.filter((task) => task.time === 'afternoon')
  const eveningTasks = tasks.filter((task) => task.time === 'evening')

  const handleDialogClose = () => {
    setAddTaskDialogIsOpen(false)
  }

  const addTaskSuccess = async (newTask) => {
    setTasks([...tasks, newTask])
    toast.success('Tarefa adicionada com sucesso!')
  }

  const handleTaskCheckboxClick = (taskId) => {
    const newTasks = tasks.map((task) => {
      if (task.id !== taskId) {
        return task
      }
      if (task.status === 'not_started') {
        toast.success('Tarefa iniciada com sucesso!')
        return { ...task, status: 'in_progress' }
      }
      if (task.status === 'in_progress') {
        toast.success('Tarefa concluída!')
        return { ...task, status: 'done' }
      }
      if (task.status === 'done') {
        toast.success('Tarefa reiniciada com sucesso!')
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

  const onDeleteTaskSuccess = async (taskId) => {
    const newTask = tasks.filter((task) => task.id !== taskId)
    setTasks(newTask)
    toast.success('Tarefa deletada com sucesso')
  }

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <div className="flex w-full justify-between">
        <div>
          <span className="text-xs font-semibold text-brand-primary">
            Minhas tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas Tarefas</h2>
        </div>

        <div className="items flex gap-3">
          <Button color="ghost">
            Limpar tarefa
            <TrashIcon />
          </Button>
          <Button onClick={() => setAddTaskDialogIsOpen(true)}>
            Nova tarefa
            <AddIcon />
          </Button>

          <AddTaskDialog
            isOpen={addTaskDialogIsOpen}
            handleClose={handleDialogClose}
            handleAddTaskSuccess={addTaskSuccess}
          />
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
              onDeleteSuccess={onDeleteTaskSuccess}
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
              onDeleteSuccess={onDeleteTaskSuccess}
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
              onDeleteSuccess={onDeleteTaskSuccess}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tasks
