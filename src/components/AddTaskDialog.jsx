import './AddTaskDialog.css'

import { useEffect, useState } from 'react'
import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import { v4 } from 'uuid'

import Button from './Button.jsx'
import Input from './Input.jsx'
import Select from './Select.jsx'

const AddTaskDialog = ({ isOpen, handleClose, handleAddTask }) => {
  const [time, setTime] = useState('')
  const [title, setTitle] = useState('morning')
  const [description, setDescription] = useState('')
  const [errors, setError] = useState([])

  const nodeRef = useRef()

  useEffect(() => {
    if (!isOpen) {
      setTitle('')
      setTime('morning')
      setDescription('')
    }
  }, [isOpen])

  const handleSaveClick = () => {
    const newErrors = []
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

    handleAddTask({
      id: v4,
      title: document.getElementById('title').value,
      time: document.getElementById('time').value,
      description: document.getElementById('description').value,
      status: 'not_started',
    })

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
              <h2 className="text-xl font-semibold text-[#35383E]">
                Nova Tarefa
              </h2>
              <p className="mt-1 text-sm text-[#9A9C9f]">
                Insira as informações abaixo
              </p>
              <div className="flex w-[336px] flex-col space-y-4">
                <Input
                  id="title"
                  placeholder="Insira o título da tarefa"
                  label="Título"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  errorMessage={titleError?.message}
                />

                <Select
                  value={time}
                  onChange={(event) => setTime(event.target.value)}
                  errorMessage={timeError?.message}
                />

                <Input
                  id="description"
                  placeholder="Descreva a tarefa"
                  label="Descrição"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  errorMessage={descriptionError?.message}
                />

                <div className="flex gap-3">
                  <Button
                    size="large"
                    className="w-full"
                    variant="secondary"
                    onClick={() => handleClose()}
                  >
                    Cancelar
                  </Button>
                  <Button
                    size="large"
                    className="w-full"
                    onClick={() => handleSaveClick()}
                  >
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

export default AddTaskDialog
