import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

import {
  CheckIcon,
  DetailsIcon,
  LoaderIcon,
  TrashIcon,
} from '../assets/icons/index.js'
import { useDeleteTask } from '../hooks/data/use-delete-task.js'
import { useUpdateTask } from '../hooks/data/use-update-task.js'
import Button from './Button.jsx'

const TaskItem = ({ task }) => {
  const { mutate: deleteTask, isPending } = useDeleteTask(task.id)

  const { mutate: updateTask } = useUpdateTask(task.id)

  const handleDeleteClick = () => {
    deleteTask(undefined, {
      onSuccess: () => {
        toast.success('Tarefa deletada com sucesso!')
      },
      onError: () => {
        toast.error('Tarefa deletada com sucesso!')
      },
    })
  }

  const handleCheckboxClick = () => {
    updateTask(
      {
        status: getNewStatus(),
      },
      {
        onSuccess: () =>
          toast.success('Status da tarefa atualizado com sucesso!'),
        onError: () =>
          toast.error(
            'Erro ao atualizar status da tarefa. Por favor, tente novamente.'
          ),
      }
    )
  }

  const getNewStatus = () => {
    if (task.status === 'not_started') {
      return 'in_progress'
    }
    if (task.status === 'in_progress') {
      return 'done'
    }
    return 'not_started'
  }

  const getVariantClass = () => {
    if (task.status === 'in_progress') {
      return 'bg-brand-process bg-opacity-10 text-brand-process'
    }

    if (task.status === 'done') {
      return 'bg-brand-primary text-brand-primary'
    }

    if (task.status === 'not_started') {
      return 'bg-brand-dark-blue bg-opacity-10 text-text-brand-dark-blue'
    }
  }
  return (
    <div
      className={`flex items-center justify-between gap-2 rounded-lg bg-opacity-10 px-4 py-3 text-sm transition ${getVariantClass()}`}
    >
      <div className="flex items-center gap-2">
        <label
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg ${getVariantClass()}`}
        >
          <input
            type="checkbox"
            checked={task.status === 'done'}
            className="absolute h-full w-full cursor-pointer opacity-0"
            onChange={handleCheckboxClick}
          />
          {task.status === 'done' && <CheckIcon />}
          {task.status === 'in_progress' && (
            <LoaderIcon className="animate-spin text-brand-white" />
          )}
        </label>
        {task.title}
      </div>
      <div className="flex items-center gap-2">
        <Button color="ghost" onClick={handleDeleteClick} disabled={isPending}>
          {isPending ? (
            <LoaderIcon className="animate-spin text-brand-white" />
          ) : (
            <TrashIcon className="text-brand-text-gray" />
          )}
        </Button>
        <Link to={`/task/${task.id}`}>
          <DetailsIcon />
        </Link>
      </div>
    </div>
  )
}
TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    time: PropTypes.oneOf(['morning', 'afternoon', 'evening']).isRequired,
    status: PropTypes.oneOf(['not_started', 'in_progress', 'done']).isRequired,
  }).isRequired,
  handleTaskCheckboxClick: PropTypes.func.isRequired,
  handleTaskDeleteClick: PropTypes.func.isRequired,
}
export default TaskItem
