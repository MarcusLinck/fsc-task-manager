import './AddTaskDialog.css'

import { createPortal } from 'react-dom'

import Button from './Button.jsx'
import Input from './Input.jsx'
import Select from './Select.jsx'

const AddTaskDialog = ({ isOpen, handleClose }) => {
  if (!isOpen) return null
  return createPortal(
    <div className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur">
      <div className="rounded-xl bg-white p-5 text-center shadow">
        <h2 className="text-xl font-semibold text-[#35383E]">Nova Tarefa</h2>
        <p className="mt-1 text-sm text-[#9A9C9f]">
          Insira as informações abaixo
        </p>
        <form className="flex w-[336px] flex-col space-y-4">
          <Input
            id="title"
            label="Título"
            placeholder="Insira o título da tarefa"
          />

          <Select />

          <Input
            id="description"
            label="Descrição"
            placeholder="Descreva a tarefa"
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
            <Button size="large" className="w-full">
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  )
}

export default AddTaskDialog
