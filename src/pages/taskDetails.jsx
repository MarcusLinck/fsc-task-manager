import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
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
  const navigate = useNavigate()
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm()

  const handleBackClick = () => {
    navigate(-1)
  }

  const queryClient = useQueryClient()

  const { data: task } = useQuery({
    queryKey: ['task', taskId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'GET',
      })
      const data = await response.json()
      reset(data)
    },
  })

  const { mutate: deleteTask, isPending: deleteTaskIsLoading } = useMutation({
    mutationKey: 'deleteById',
    mutationFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        return toast.error(
          'Erro ao deletar a tarefa. Por favor tente novamente'
        )
      }
      const deletedTask = await response.json()
      queryClient.setQueryData('tasks', (oldTasks) => {
        return oldTasks.filter((oldTask) => oldTask.id !== deletedTask.id)
      })
    },
  })

  const { mutate: updateTaskById, isPending: updateTaskIsLoading } =
    useMutation({
      mutationKey: 'updateTaskById',
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

  const handleDeleteClick = async () => {
    deleteTask(task, {
      onSuccess: () => {
        toast.success('Tarefa deletada com sucesso!')
        navigate(-1)
      },
      onError: () => {
        toast.error('Erro ao deletar tarefa!')
      },
    })
  }

  const updateTask = async (data) => {
    updateTaskById(data, {
      onSuccess: () => {
        toast.success('Tarefa atualizada com sucesso!')
        navigate(-1)
      },
      onError: () => {
        toast.error('Erro ao atualizar tarefa!')
      },
    })
  }

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
          <Button
            className="h-fit self-end"
            color="danger"
            onClick={handleDeleteClick}
          >
            <TrashIcon />
            Deletar tarefa
          </Button>
        </div>

        <form onSubmit={handleSubmit(updateTask)}>
          {/* dados da tarefa */}
          <div className="space-y-6 rounded-xl bg-brand-white p-6">
            <div>
              <Input
                id="title"
                label="Título"
                {...register('title', {
                  required: 'O título é obrigatório',
                  validate: (value) => {
                    if (!value.trim()) {
                      return 'O título não pode ser vazio'
                    }
                    return true
                  },
                })}
                errorMessage={errors?.title?.message}
              />
            </div>

            <div>
              <Select
                {...register('time', {
                  required: 'O horário é obrigatório',
                })}
                errorMessage={errors?.time?.message}
              />
            </div>

            <div>
              <Input
                id="description"
                label="Descrição"
                {...register('description', {
                  required: 'A descrição é obrigatório',
                  validate: (value) => {
                    if (!value.trim()) {
                      return 'A descrição não pode ser vazia'
                    }
                    return true
                  },
                })}
                errorMessage={errors?.description?.message}
              />
            </div>
          </div>
          {/* botão de salvar */}
          <div className="flex w-full justify-end gap-3">
            <Button
              size="large"
              color="primary"
              type="submit"
              disabled={updateTaskIsLoading || deleteTaskIsLoading}
            >
              {(updateTaskIsLoading || deleteTaskIsLoading) && (
                <LoaderIcon className="animate-spin text-brand-white" />
              )}
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskDetailsPage
