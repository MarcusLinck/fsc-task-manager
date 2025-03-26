import './AddTaskDialog.css'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { useForm } from 'react-hook-form'
import { CSSTransition } from 'react-transition-group'
import { toast } from 'sonner'
import { v4 } from 'uuid'

import { LoaderIcon } from '../assets/icons/index.js'
import Button from './Button.jsx'
import Input from './Input.jsx'
import Select from './Select.jsx'

const AddTaskDialog = ({ isOpen, handleClose }) => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm()

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
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
      return response.json
    },
  })

  const nodeRef = useRef()

  const handleSaveClick = async (data) => {
    const newTask = {
      id: v4,
      title: data.title,
      time: data.time,
      description: data.description,
      status: 'not_started',
    }

    mutate(newTask, {
      onSuccess: () => {
        queryClient.setQueryData('tasks', (currentTasks) => {
          return [...currentTasks, newTask]
        })
        reset()
        handleClose()
      },
      onError: () => {
        toast.error('Erro ao adicionar a tarefa. Por favor tente novamente')
      },
    })
  }

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={500}
      classNames="add-task-dialog"
      unmountOnExit
    >
      <div>
        {createPortal(
          <div
            ref={nodeRef}
            className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur"
          >
            <div className="rounded-xl bg-white p-5 text-center shadow">
              <h2 className="text-xl font-semibold text-brand-dark-blue">
                Nova Tarefa
              </h2>
              <p className="mt-1 text-sm text-brand-text-gray">
                Insira as informações abaixo
              </p>
              <form
                onSubmit={handleSubmit(handleSaveClick)}
                className="flex w-[336px] flex-col space-y-4"
              >
                <Input
                  id="title"
                  placeholder="Insira o título da tarefa"
                  label="Título"
                  errorMessage={errors?.title?.message}
                  {...register('title', {
                    required: 'O título é obrigatório',
                    validate: (value) => {
                      if (!value.trim()) {
                        return 'O título não pode ser vazio'
                      }
                      return true
                    },
                  })}
                />

                <Select
                  errorMessage={errors?.time?.message}
                  {...register('time', {
                    required: 'O horário é obrigatório',
                  })}
                />

                <Input
                  id="description"
                  placeholder="Descreva a tarefa"
                  label="Descrição"
                  errorMessage={errors?.description?.message}
                  {...register('description', {
                    required: 'A descrição é obrigatório',
                    validate: (value) => {
                      if (!value.trim()) {
                        return 'A descrição não pode ser vazia'
                      }
                      return true
                    },
                  })}
                />

                <div className="flex gap-3">
                  <Button
                    size="large"
                    className="w-full"
                    color="secondary"
                    onClick={() => handleClose()}
                    type="button"
                  >
                    Cancelar
                  </Button>

                  <Button size="large" className="w-full" type="submit">
                    {isSubmitting && (
                      <LoaderIcon className="animate-spin text-brand-white" />
                    )}
                    Salvar
                  </Button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}
      </div>
    </CSSTransition>
  )
}
AddTaskDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
}
export default AddTaskDialog
