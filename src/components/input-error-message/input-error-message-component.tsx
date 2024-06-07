import { ButtonHTMLAttributes, FunctionComponent, ReactNode } from 'react'

// Styles
import { InputErrorMessageContainer } from './input-error-message-styles'

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

const InputErrorMessage: FunctionComponent<CustomButtonProps> = ({
  children
}) => {
  return <InputErrorMessageContainer>{children}</InputErrorMessageContainer>
}

export default InputErrorMessage
