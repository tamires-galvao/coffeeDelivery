import { createContext, ReactNode, useEffect, useReducer } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  addItemAction,
  checkoutCartAction,
  decrementItemQuantityAction,
  incrementItemQuantityAction,
  removeItemAction,
} from '../reduces/cart/actions'
import { cartReducer, Item, Order } from '../reduces/cart/reducer'
import { OrderInfo } from '../pages/Cart'

interface CartContextType {
  cart: Item[]
  orders: Order[]
  addItem: (item: Item) => void
  removeItem: (itemId: Item['id']) => void
  decrementItemQuantity: (itemId: Item['id']) => void
  incrementItemQuantity: (itemId: Item['id']) => void
  checkout: (order: OrderInfo) => void
  getItemQuantity: (itemId: Item['id']) => number // Nova função adicionada
}

export const CartContext = createContext({} as CartContextType)

interface CartContextProviderProps {
  children: ReactNode
}

// Função para carregar estado do localStorage
function loadStoredState() {
  const storedStateAsJSON = localStorage.getItem('@coffee-delivery:cart-state-1.0.0')
  return storedStateAsJSON ? JSON.parse(storedStateAsJSON) : { cart: [], orders: [] }
}

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cartState, dispatch] = useReducer(cartReducer, undefined, loadStoredState)
  const navigate = useNavigate()

  const { cart, orders } = cartState

  function getItemQuantity(itemId: Item['id']): number {
    const item = cart.find((item) => item.id === itemId);
    return item ? item.quantity : 0;
  }

  function addItem(item: Item) {
    dispatch(addItemAction(item))
  }

  function removeItem(itemId: Item['id']) {
    dispatch(removeItemAction(itemId))
  }

  function checkout(order: OrderInfo) {
    dispatch(checkoutCartAction(order))
    navigate('/success') // Mova a navegação para fora do reducer
  }

  function incrementItemQuantity(itemId: Item['id']) {
    dispatch(incrementItemQuantityAction(itemId))
  }

  function decrementItemQuantity(itemId: Item['id']) {
    dispatch(decrementItemQuantityAction(itemId))
  }

  useEffect(() => {
    localStorage.setItem('@coffee-delivery:cart-state-1.0.0', JSON.stringify(cartState))
  }, [cartState])

  return (
   <CartContext.Provider
      value={{
        cart,
        orders,
        addItem,
        removeItem,
        decrementItemQuantity,
        incrementItemQuantity,
        checkout,
        getItemQuantity, // Adicionando a função aqui
      }}
   >
      {children}
  </CartContext.Provider>
  )
}
