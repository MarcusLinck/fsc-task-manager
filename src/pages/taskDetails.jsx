import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

import {
  ArrowLeftIcon,
  ChevronRightIcon,
  LoaderIcon,
  TrashIcon,
} from '../assets/icons'
import Button from '../components/Button'
import Input from '../components/Input'
import Select from '../components/Select'
import Sidebar from '../components/Sidebar'

const TaskDetailsPage = () => {
  const { taskId } = useParams()
  const [task, setTask] = useState()
  const [errors, setError] = useState([])
  const [updateIsLoading, setUpdateIsLoading] = useState(false)
  const navigate = useNavigate()

  const titleRef = useRef()
  const descriptionRef = useRef()
  const timeRef = useRef()

  const handleBackClick = () => {
    navigate(-1)
  }

  const updateTask = async () => {
    const newErrors = []

    const title = titleRef.current.value
    const time = timeRef.current.value
    const description = descriptionRef.current.value

    if (!title.trim()) {
      newErrors.push({
        inputName: 'title',
        message: 'O título é obrigatório',
      })
    }

    if (!time.trim()) {
      newErrors.push({
        inputName: 'time',
        message: 'O horário é obrigatório',
      })
    }

    if (!description.trim()) {
      newErrors.push({
        inputName: 'description',
        message: 'A descrição é obrigatória',
      })
    }

    setError(newErrors)

    if (newErrors.length > 0) {
      return
    }

    setUpdateIsLoading(true)
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        title,
        time,
        description,
      }),
    })

    if (!response.ok) {
      setUpdateIsLoading(false)
      return toast.error(
        'Erro ao atualizar a tarefa. Por favor tente novamente'
      )
    }
    setUpdateIsLoading(false)

    const data = await response.json()
    console.log(data)
    setTask(data)
  }

  const titleError = errors.find((error) => error.inputName === 'title')
  const descriptionError = errors.find(
    (error) => error.inputName === 'description'
  )
  const timeError = errors.find((error) => error.inputName === 'time')

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
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-6 px-8 py-16">
        {/* barra do topo */}
        <div className="flex w-full justify-between">
          {/* parte da esquerda */}
          <div>
            <button
              onClick={handleBackClick}
              className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary"
            >
              <ArrowLeftIcon />
            </button>
            <div className="flex items-center gap-1 text-xs">
              <Link className="cursor-pointer text-brand-text-gray" to="/">
                Minhas tarefas
              </Link>
              <ChevronRightIcon className="text-brand-text-gray" />
              <span className="font-semibold text-brand-primary">
                {task?.title}
              </span>
            </div>

            <h1 className="mt-2 text-xl font-semibold">{task?.title}</h1>
          </div>

          {/* parte da direita */}
          <Button className="h-fit self-end" color="danger">
            <TrashIcon />
            Deletar tarefa
          </Button>
        </div>

        <div>
          {/* dados da tarefa */}
          <div className="space-y-6 rounded-xl bg-brand-white p-6">
            <div>
              <Input
                id="title"
                label="Título"
                defaultValue={task?.title}
                ref={titleRef}
                errorMessage={titleError?.message}
                disabled={updateIsLoading}
              />
            </div>

            <div>
              <Select
                defaultValue={task?.time}
                ref={timeRef}
                errorMessage={timeError?.message}
                disabled={updateIsLoading}
              />
            </div>

            <div>
              <Input
                id="description"
                label="Descrição"
                defaultValue={task?.description}
                ref={descriptionRef}
                errorMessage={descriptionError?.message}
                disabled={updateIsLoading}
              />
            </div>
          </div>
          {/* botão de salvar */}
          <div className="flex w-full justify-end gap-3">
            <Button
              size="large"
              color="primary"
              onClick={updateTask}
              disabled={updateIsLoading}
            >
              {updateIsLoading && (
                <LoaderIcon className="animate-spin text-brand-white" />
              )}
              Salvar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskDetailsPage
