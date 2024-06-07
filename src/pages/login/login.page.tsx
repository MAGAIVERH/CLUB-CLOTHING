import { BsGoogle } from 'react-icons/bs'
import { FiLogIn } from 'react-icons/fi'

// Components
import CustomButton from '../../components/custom-button/custom-button-component'
import Header from '../../components/header/header.component'

// Styles
import {
  LoginContainer,
  LoginContent,
  LoginHeadline,
  LoginInputContainer,
  LoginSubtitle
} from './login.styles'
import { CustomInputContainer } from '../../components/custom-input/custom-input-styles'

const LoginPage = () => {
  return (
    <>
      <Header />
      <LoginContainer>
        <LoginContent>
          <LoginHeadline>Entre com a sua conta</LoginHeadline>

          <CustomButton startIcon={<BsGoogle size={18} />}>
            Entrar com o Google
          </CustomButton>

          <LoginSubtitle>ou entre com o seu e-mail</LoginSubtitle>

          <LoginInputContainer>
            <CustomInputContainer placeholder='Digite seu e-mail' />
          </LoginInputContainer>

          <LoginInputContainer>
            <CustomInputContainer placeholder='Digite sua senha' />
          </LoginInputContainer>

          <CustomButton startIcon={<FiLogIn size={18} />}>Entrar</CustomButton>
        </LoginContent>
      </LoginContainer>
    </>
  )
}

export default LoginPage
