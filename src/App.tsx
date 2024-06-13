import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { FunctionComponent, useContext } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'

//Pages
import HomePage from './pages/home/home.page'
import LoginPage from './pages/login/login.page'
import SignUpPage from './pages/sign-up/sign-up.page'

// Utilities
import { auth, db } from './config/firebase.config'
import { UserContext } from './contexts/user.context'
import User from './types/user.types'

const App: FunctionComponent = () => {
  const { isAuthenticated, loginUser, logoutUser } = useContext(UserContext)

  onAuthStateChanged(auth, async (user) => {
    // Se o usuario estiver logado no contexto, e o usuario o firebase (sign out)
    // devemos limpar o contexto (sign out)

    const isSignOut = isAuthenticated && !user
    if (isSignOut) {
      return logoutUser()
    }

    // Se o usuario for nulo no contexto, e noa for nulo no firebase
    // devemos fazer login
    const isSignIn = !isAuthenticated && user
    if (isSignIn) {
      const querySnapshot = await getDocs(
        query(collection(db, 'user'), where('id', '==', user.uid))
      )

      const userFromFireStore = querySnapshot.docs[0]?.data()

      return loginUser(userFromFireStore as User)
    }
  })

  console.log({ isAuthenticated })

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/sign-up' element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
