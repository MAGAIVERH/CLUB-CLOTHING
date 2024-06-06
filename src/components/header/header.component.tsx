import { BsCart3 } from 'react-icons/bs'

// Styles
import {
  HeaderConatiner,
  HeaderItem,
  HeaderItems,
  HeaderTitle
} from './header.styles'

const Header = () => {
  return (
    <HeaderConatiner>
      <HeaderTitle>CLUB CLOTHING</HeaderTitle>

      <HeaderItems>
        <HeaderItem>Explorar</HeaderItem>
        <HeaderItem>Login</HeaderItem>
        <HeaderItem>Criar Conta</HeaderItem>
        <HeaderItem>
          <BsCart3 size={25} />
          <p style={{ marginLeft: 5 }}>5</p>
        </HeaderItem>
      </HeaderItems>
    </HeaderConatiner>
  )
}

export default Header
