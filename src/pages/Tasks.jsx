import Sidebar from '../components/Sidebar.jsx'
import Tasks from '../components/Tasks.jsx'

function TasksPage() {
  return (
    <div className="flex">
      <Sidebar />
      <Tasks />
    </div>
  )
}

export default TasksPage
