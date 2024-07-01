import { BsCart3 } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { signOut } from 'firebase/auth'

// Styles
import {
  HeaderConatiner,
  HeaderItem,
  HeaderItems,
  HeaderTitle
} from './header.styles'

// Utilities
import { auth } from '../../config/firebase.config'
import { UserContext } from '../../contexts/user.context'
import { CartContext } from '../../contexts/cart.context'

const Header = () => {
  const navigate = useNavigate()

  const { isAuthenticated } = useContext(UserContext)
  const { toggleCart } = useContext(CartContext)

  const handleLogoClick = () => {
    navigate('/')
  }

  const handleLoginClick = () => {
    navigate('/login')
  }

  const hanldeSignUpClick = () => {
    navigate('/sign-up')
  }

  const handleExploreclick = () => {
    navigate('/explore')
  }

  return (
    <HeaderConatiner>
      <HeaderTitle onClick={handleLogoClick}>CLUB CLOTHING</HeaderTitle>

      <HeaderItems>
        <HeaderItem onClick={handleExploreclick}>Explorar</HeaderItem>
        {!isAuthenticated && (
          <>
            <HeaderItem onClick={handleLoginClick}>Login</HeaderItem>
            <HeaderItem onClick={hanldeSignUpClick}>Criar Conta</HeaderItem>
          </>
        )}

        {isAuthenticated && (
          <HeaderItem onClick={() => signOut(auth)}>Sair</HeaderItem>
        )}
        <HeaderItem onClick={toggleCart}>
          <BsCart3 size={25} />
          <p style={{ marginLeft: 5 }}>5</p>
        </HeaderItem>
      </HeaderItems>
    </HeaderConatiner>
  )
}

export default Header
