import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import Login from './Login'
import Register from './Register'
import 'bootstrap/dist/css/bootstrap.min.css';


function Root() {
  const [page, setPage] = useState<'login' | 'app' | 'register'>('login')

  const handleLoginSuccess = () => {
    setPage('app') // après connexion, on passe à App
  }

  const handleChangeToLogin = () => {
    setPage('login') // après connexion, on passe à App
  }

  const handleChangeToRegister = () => {
    setPage('register') // après connexion, on passe à App
  }

  return (
    <>
      {page === 'login' && <Login onLoginSuccess={handleLoginSuccess} goToRegister={handleChangeToRegister} />}
      {page === 'app' && <App />}
      {page === 'register' && <Register goToLogin={handleChangeToLogin} />}
    </>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>
)
