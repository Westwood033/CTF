import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import Login from './Login'
import Register from './Register'
import Morpion from './Morpion'
import 'bootstrap/dist/css/bootstrap.min.css';


function Root() {
  const [page, setPage] = useState<'login' | 'app' | 'register' | 'morpion'>('login')

  const handleLoginSuccess = () => {
    setPage('app')
  }

  const handleChangeToLogin = () => {
    setPage('login')
  }

  const handleChangeToRegister = () => {
    setPage('register')
  }

  const handleChangeToMorpion = () => {
    setPage('morpion')
  }

  return (
    <>
      {page === 'login' && <Login onLoginSuccess={handleLoginSuccess} goToRegister={handleChangeToRegister} />}
      {page === 'app' && <App goToMorpion={handleChangeToMorpion} />}
      {page === 'register' && <Register goToLogin={handleChangeToLogin} />}
      {page === 'morpion' && <Morpion goToApp={handleLoginSuccess}/>}
    </>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>
)
