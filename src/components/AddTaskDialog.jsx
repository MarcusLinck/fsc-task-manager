import './AddTaskDialog.css'

import PropTypes from 'prop-types'
import { useState } from 'react'
import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import { toast } from 'sonner'
import { v4 } from 'uuid'

import { LoaderIcon } from '../assets/icons/index.js'
import Button from './Button.jsx'
import Input from './Input.jsx'
import Select from './Select.jsx'

const AddTaskDialog = ({ isOpen, handleClose, handleAddTaskSuccess }) => {
  const [errors, setError] = useState([])
  const [addIsLoading, setAddIsLoading] = useState(false)

  const nodeRef = useRef()
  const titleRef = useRef()
  const descriptionRef = useRef()
  const timeRef = useRef()

  const handleSaveClick = async () => {
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

    const newTask = {
      id: v4,
      title: titleRef.current.value,
      time: timeRef.current.value,
      description: descriptionRef.current.value,
      status: 'not_started',
    }

    setAddIsLoading(true)

    const response = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      body: JSON.stringify(newTask),
    })

    if (!response.ok) {
      setAddIsLoading(false)
      return toast.error(
        'Erro ao adicionar a tarefa. Por favor tente novamente'
      )
    }
    setAddIsLoading(false)
    handleAddTaskSuccess(newTask)

    handleClose()
  }

  const titleError = errors.find((error) => error.inputName === 'title')
  const descriptionError = errors.find(
    (error) => error.inputName === 'description'
  )
  const timeError = errors.find((error) => error.inputName === 'time')

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
              <div className="flex w-[336px] flex-col space-y-4">
                <Input
                  id="title"
                  placeholder="Insira o título da tarefa"
                  label="Título"
                  errorMessage={titleError?.message}
                  ref={titleRef}
                />

                <Select errorMessage={timeError?.message} ref={timeRef} />

                <Input
                  id="description"
                  placeholder="Descreva a tarefa"
                  label="Descrição"
                  errorMessage={descriptionError?.message}
                  ref={descriptionRef}
                />

                <div className="flex gap-3">
                  <Button
                    size="large"
                    className="w-full"
                    color="secondary"
                    onClick={() => handleClose()}
                    disabled={addIsLoading}
                  >
                    Cancelar
                  </Button>

                  <Button
                    size="large"
                    className="w-full"
                    onClick={() => handleSaveClick()}
                    disabled={addIsLoading}
                  >
                    {addIsLoading && (
                      <LoaderIcon className="animate-spin text-brand-white" />
                    )}
                    Salvar
                  </Button>
                </div>
              </div>
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
  handleAddTaskSuccess: PropTypes.func.isRequired,
}
export default AddTaskDialog
