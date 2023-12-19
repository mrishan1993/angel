import AppRoutes from "./routes/routes.jsx";
import { UsersProvider } from "./pages/login.jsx";
import { CatsContextProvider } from "./pages/angel.jsx";
import './App.css'

const App = () => (
  <div className="h-full">
    <CatsContextProvider>
      <AppRoutes />
    </CatsContextProvider>
    
  </div>
    
  )

export default App
