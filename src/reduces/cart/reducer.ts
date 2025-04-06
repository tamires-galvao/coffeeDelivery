import { produce } from 'immer'
import { ActionTypes, Actions } from './actions'
import { OrderInfo } from '../../pages/Cart'

// Interfaces mais detalhadas
export interface Item {
  id: string
  quantity: number
  name?: string // Opcional para melhor tracking
  price?: number // Opcional para cálculos futuros
}

export interface Order extends OrderInfo {
  id: number
  items: Item[]
  createdAt: Date
}

interface CartState {
  cart: Item[]
  orders: Order[]
}

// Constantes úteis
const MIN_QUANTITY = 1
const MAX_QUANTITY = 99 // Limite máximo razoável

export function cartReducer(state: CartState, action: Actions): CartState {
  switch (action.type) {
    case ActionTypes.ADD_ITEM: {
      if (!action.payload?.item) {
        console.warn('No item provided to add')
        return state
      }
      
      return produce(state, (draft) => {
        const itemAlreadyAdded = draft.cart.find(
          (item) => item.id === action.payload.item.id
        )

        if (itemAlreadyAdded) {
          const newQuantity = itemAlreadyAdded.quantity + action.payload.item.quantity
          itemAlreadyAdded.quantity = Math.min(newQuantity, MAX_QUANTITY)
        } else {
          draft.cart.push({
            ...action.payload.item,
            quantity: Math.min(action.payload.item.quantity, MAX_QUANTITY)
          })
        }
      })
    }

    case ActionTypes.REMOVE_ITEM: {
      if (!action.payload?.itemId) {
        console.warn('No itemId provided to remove')
        return state
      }

      return produce(state, (draft) => {
        const itemIndex = draft.cart.findIndex(
          (item) => item.id === action.payload.itemId
        )
        
        if (itemIndex !== -1) {
          draft.cart.splice(itemIndex, 1)
        }
      })
    }

    case ActionTypes.INCREMENT_ITEM_QUANTITY: {
      if (!action.payload?.itemId) {
        console.warn('No itemId provided to increment')
        return state
      }

      return produce(state, (draft) => {
        const item = draft.cart.find(
          (item) => item.id === action.payload.itemId
        )

        if (item && item.quantity < MAX_QUANTITY) {
          item.quantity += 1
        }
      })
    }

    case ActionTypes.DECREMENT_ITEM_QUANTITY: {
      if (!action.payload?.itemId) {
        console.warn('No itemId provided to decrement')
        return state
      }

      return produce(state, (draft) => {
        const item = draft.cart.find(
          (item) => item.id === action.payload.itemId
        )

        if (item && item.quantity > MIN_QUANTITY) {
          item.quantity -= 1
        }
      })
    }

    case ActionTypes.CHECKOUT_CART: {
      if (!state.cart.length || !action.payload?.order) {
        console.warn('Invalid checkout payload')
        return state
      }
    
      return produce(state, (draft) => {
        const newOrder: Order = {
          ...action.payload.order,
          items: [...state.cart],
        }
    
        draft.orders.push(newOrder)
        draft.cart = []
      })
    }
    
    default:
      return state
  }
}

// Função auxiliar para validação
export const validateItem = (item: Item): boolean => {
  return !!item?.id && 
         typeof item.quantity === 'number' && 
         item.quantity >= MIN_QUANTITY && 
         item.quantity <= MAX_QUANTITY
}