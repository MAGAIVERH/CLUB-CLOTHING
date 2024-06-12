import { FiLogIn } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import validator from 'validator'
import {
  AuthError,
  AuthErrorCodes,
  createUserWithEmailAndPassword
} from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'

// Componenets
import CustomButton from '../../components/custom-button/custom-button-component'
import CustomInput from '../../components/custom-input/custom-input-component'
import Header from '../../components/header/header.component'
import InputErrorMessage from '../../components/input-error-message/input-error-message-component'

// Styles
import {
  SignUpConatiner,
  SignUpContent,
  SignUpHeadLine,
  SignUpInputContainer
} from './sign-up.styles'

// Utilities
import { auth, db } from '../../config/firebase.config'

interface SignUpForm {
  firstName: string
  lastname: string
  email: string
  password: string
  passwordConfirmation: string
}

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors }
  } = useForm<SignUpForm>()

  const watchPassword = watch('password')

  const handleSubmitPress = async (data: SignUpForm) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )

      await addDoc(collection(db, 'user'), {
        id: userCredentials.user.uid,
        email: userCredentials.user.email,
        firstName: data.firstName,
        lastName: data.lastname,
        provider: 'firebase'
      })
    } catch (error) {
      const _error = error as AuthError

      if (_error.code === AuthErrorCodes.EMAIL_EXISTS) {
        return setError('email', { type: 'alreadyInUse' })
      }
    }
  }

  return (
    <>
      <Header />

      <SignUpConatiner>
        <SignUpContent>
          <SignUpHeadLine>Crie sua conta</SignUpHeadLine>

          <SignUpInputContainer>
            <p>Nome</p>
            <CustomInput
              hasError={!!errors?.firstName}
              placeholder='Digite seu nome'
              {...register('firstName', { required: true })}
            />

            {errors?.firstName?.type === 'required' && (
              <InputErrorMessage>O nome é obrigatório.</InputErrorMessage>
            )}
          </SignUpInputContainer>

          <SignUpInputContainer>
            <p>Sobrenome</p>
            <CustomInput
              hasError={!!errors?.lastname}
              placeholder='Digite seu sobrenome'
              {...register('lastname', { required: true })}
            />

            {errors?.lastname?.type === 'required' && (
              <InputErrorMessage>O sobrenome é obrigatório.</InputErrorMessage>
            )}
          </SignUpInputContainer>

          <SignUpInputContainer>
            <p>E-mail</p>
            <CustomInput
              hasError={!!errors?.email}
              placeholder='Digite seu e-mail'
              {...register('email', {
                required: true,
                validate: (value) => {
                  return validator.isEmail(value)
                }
              })}
            />

            {errors?.email?.type === 'required' && (
              <InputErrorMessage>O email é obrigatório.</InputErrorMessage>
            )}

            {errors?.email?.type === 'alreadyInUse' && (
              <InputErrorMessage>
                Este email já esta sendo utilizado.
              </InputErrorMessage>
            )}

            {errors?.email?.type === 'validate' && (
              <InputErrorMessage>
                Por favor insira um emila válido.
              </InputErrorMessage>
            )}
          </SignUpInputContainer>

          <SignUpInputContainer>
            <p>Senha</p>
            <CustomInput
              hasError={!!errors?.password}
              placeholder='Digite sua senha'
              type='password'
              {...register('password', { required: true, minLength: 6 })}
            />

            {errors?.password?.type === 'required' && (
              <InputErrorMessage>A senha é obrigatória.</InputErrorMessage>
            )}

            {errors?.password?.type === 'minLength' && (
              <InputErrorMessage>
                A senha precisa ter no mínino 6 caracteres.
              </InputErrorMessage>
            )}
          </SignUpInputContainer>

          <SignUpInputContainer>
            <p>Confirmação de senha</p>
            <CustomInput
              hasError={!!errors?.passwordConfirmation}
              placeholder='Digite novamente sua senha'
              type='password'
              {...register('passwordConfirmation', {
                required: true,
                minLength: 6,
                validate: (value) => {
                  return value === watchPassword
                }
              })}
            />

            {errors?.passwordConfirmation?.type === 'required' && (
              <InputErrorMessage>
                A confirmação de senha é obrigatória.
              </InputErrorMessage>
            )}

            {errors?.password?.type === 'minLength' && (
              <InputErrorMessage>
                A confirmação de senha precisa ter no mínino 6 caracteres.
              </InputErrorMessage>
            )}

            {errors?.passwordConfirmation?.type === 'validate' && (
              <InputErrorMessage>
                A confirmação de senha precisa ser igual a senha.
              </InputErrorMessage>
            )}
          </SignUpInputContainer>

          <CustomButton
            onClick={() => handleSubmit(handleSubmitPress)()}
            startIcon={<FiLogIn size={18} />}
          >
            Criar conta
          </CustomButton>
        </SignUpContent>
      </SignUpConatiner>
    </>
  )
}

export default SignUpPage
