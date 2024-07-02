import { FunctionComponent, ReactNode, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Utilities
import { UserContext } from '../contexts/user.context'

// Components
import Header from '../components/header/header.component'
import Loading from '../components/loading/loading.component'

interface AuthenticationProps {
  children: ReactNode
}
const Authentication: FunctionComponent<AuthenticationProps> = ({
  children
}) => {
  const { isAuthenticated } = useContext(UserContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    }
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return (
      <>
        <Header />

        <Loading message='Você precisa está logado para acessar essa página! Você será redirecionado para a página de login em instantes.' />
      </>
    )
  }

  return <>{children}</>
}

export default Authentication
