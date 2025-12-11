import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import Login from './Login'
import 'bootstrap/dist/css/bootstrap.min.css';


function Root() {
  const [page, setPage] = useState<'login' | 'app'>('login')

  const handleLoginSuccess = () => {
    setPage('app') // après connexion, on passe à App
  }

  return (
    <>
      {page === 'login' && <Login onLoginSuccess={handleLoginSuccess} />}
      {page === 'app' && <App />}
    </>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>
)
