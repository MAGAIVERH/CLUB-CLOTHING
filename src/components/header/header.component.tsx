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

const Header = () => {
  const navigate = useNavigate()

  const { isAuthenticated } = useContext(UserContext)

  const handleLoginClick = () => {
    navigate('/login')
  }

  const hanldeSignUpClick = () => {
    navigate('/sign-up')
  }

  return (
    <HeaderConatiner>
      <HeaderTitle>CLUB CLOTHING</HeaderTitle>

      <HeaderItems>
        <HeaderItem>Explorar</HeaderItem>
        {!isAuthenticated && (
          <>
            <HeaderItem onClick={handleLoginClick}>Login</HeaderItem>
            <HeaderItem onClick={hanldeSignUpClick}>Criar Conta</HeaderItem>
          </>
        )}

        {isAuthenticated && (
          <HeaderItem onClick={() => signOut(auth)}>Sair</HeaderItem>
        )}
        <HeaderItem>
          <BsCart3 size={25} />
          <p style={{ marginLeft: 5 }}>5</p>
        </HeaderItem>
      </HeaderItems>
    </HeaderConatiner>
  )
}

export default Header
