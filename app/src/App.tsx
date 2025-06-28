import AppRoutes from './routes/main.routes'
import { ChatProvider } from './contexts/chat.context'

function App() {
  return (
    <ChatProvider>
      <AppRoutes />
    </ChatProvider>
  )
}

export default App
