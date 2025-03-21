import { Toaster } from 'sonner'

import Sidebar from './components/Sidebar.jsx'
import Tasks from './components/Tasks.jsx'

function App() {
  return (
    <div className="flex">
      <Toaster
        toastOptions={{
          style: {
            color: '#35383E',
          },
        }}
      />
      <Sidebar />
      <Tasks />
    </div>
  )
}

export default App
