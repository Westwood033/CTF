import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import Login from './Login'
import Register from './Register'
import Morpion from './Morpion'
import Flag from './Flag'
import 'bootstrap/dist/css/bootstrap.min.css';


function Root() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [page, setPage] = useState<'login' | 'app' | 'register' | 'morpion' | 'flag'>('login')

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user); 
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

  const handleChangeToFlag = () => {
    setPage('flag')
  }

  const hadleChangeToApp = () => {
    setPage('app')
  }


  return (
    <>
      {page === 'login' && <Login onLoginSuccess={handleLoginSuccess} goToRegister={handleChangeToRegister} />}
      {page === 'app' && <App goToMorpion={handleChangeToMorpion} goToFlagList={handleChangeToFlag}  currentUser={currentUser}/>}
      {page === 'register' && <Register goToLogin={handleChangeToLogin} />}
      {page === 'morpion' && <Morpion goToApp={hadleChangeToApp}/>}
      {page === 'flag' && <Flag goToApp={hadleChangeToApp}/>}
    </>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>
)
