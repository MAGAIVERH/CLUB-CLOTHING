import { FunctionComponent, ReactNode, createContext, useState } from 'react'
import CartProduct from '../types/cart.types'

interface ICartContext {
  isVisible: boolean
  products: CartProduct[]
  toggleCart: () => void
}

export const CartContext = createContext<ICartContext>({
  isVisible: false,
  products: [],
  toggleCart: () => {}
})

interface CartContextProviderProps {
  children: ReactNode
}
const CartContextProvider: FunctionComponent<CartContextProviderProps> = ({
  children
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [products] = useState<CartProduct[]>([])

  const toggleCart = () => {
    setIsVisible((prevState) => !prevState)
  }

  return (
    <CartContext.Provider value={{ isVisible, products, toggleCart }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider
