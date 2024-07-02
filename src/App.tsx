import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { FunctionComponent, useContext, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'

//Pages
import HomePage from './pages/home/home.page'
import LoginPage from './pages/login/login.page'
import SignUpPage from './pages/sign-up/sign-up.page'
import ExplorePage from './pages/explore/explore.page'
import CategoryDetailsPage from './pages/category-details/category-details.page'

// Components
import Loading from './components/loading/loading.component'
import Cart from './components/cart/cart.component'

// Utilities
import { auth, db } from './config/firebase.config'
import { UserContext } from './contexts/user.context'
import { userConverter } from './converters/firestore-converters'
import CheckoutPage from './pages/checkout/checkout.page'

const App: FunctionComponent = () => {
  const [isInitializing, setIsInitializing] = useState(true)

  const { isAuthenticated, loginUser, logoutUser } = useContext(UserContext)

  onAuthStateChanged(auth, async (user) => {
    // Se o usuario estiver logado no contexto, e o usuario o firebase (sign out)
    // devemos limpar o contexto (sign out)
    const isSignOut = isAuthenticated && !user
    if (isSignOut) {
      logoutUser()
      return setIsInitializing(false)
    }

    // Se o usuario for nulo no contexto, e noa for nulo no firebase
    // devemos fazer login
    const isSignIn = !isAuthenticated && user
    if (isSignIn) {
      const querySnapshot = await getDocs(
        query(
          collection(db, 'user').withConverter(userConverter),
          where('id', '==', user.uid)
        )
      )

      const userFromFireStore = querySnapshot.docs[0]?.data()

      loginUser(userFromFireStore)
      return setIsInitializing(false)
    }
    return setIsInitializing(false)
  })

  if (isInitializing) return <Loading />

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/explore' element={<ExplorePage />} />
        <Route path='category/:id' element={<CategoryDetailsPage />} />
        <Route path='/checkout' element={<CheckoutPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/sign-up' element={<SignUpPage />} />
      </Routes>

      <Cart />
    </BrowserRouter>
  )
}

export default App
