import { Link } from 'react-router-dom'

import { HomeIcon, TasksIcon } from '../assets/icons/index.js'
import SidebarButton from './SidebarButton.jsx'
const Sidebar = () => {
  return (
    <div className="h-screen w-72 min-w-72 bg-white">
      <div className="space-y-4 px-8 py-6">
        <h1 className="text-xl font-semibold text-brand-primary">
          Task Manager
        </h1>
        <p>
          Um simples{' '}
          <span className="text-brand-primary">organizador de tarefas</span>
        </p>
      </div>

      <div className="flex flex-col gap-2 p-2">
        <Link to="/">
          <SidebarButton to="/">
            <HomeIcon />
            Início
          </SidebarButton>
        </Link>
        <Link to="/tasks">
          <SidebarButton to="/tasks">
            <TasksIcon />
            Minhas Tarefas
          </SidebarButton>
        </Link>
      </div>
    </div>
  )
}

export default Sidebar
