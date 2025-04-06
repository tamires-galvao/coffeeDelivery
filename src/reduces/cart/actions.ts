/* eslint-disable no-unused-vars */
import { OrderInfo } from '../../pages/Cart'
import { Item } from './reducer'

// Enumeração das ações disponíveis no sistema de carrinho
export enum ActionTypes {
  ADD_ITEM = 'ADD_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
  INCREMENT_ITEM_QUANTITY = 'INCREMENT_ITEM_QUANTITY',
  DECREMENT_ITEM_QUANTITY = 'DECREMENT_ITEM_QUANTITY',
  CHECKOUT_CART = 'CHECKOUT_CART',
}

// Tipagem detalhada das ações
export type Actions =
  | {
      type: ActionTypes.ADD_ITEM
      payload: {
        item: Item
      }
    }
  | {
      type:
        | ActionTypes.REMOVE_ITEM
        | ActionTypes.INCREMENT_ITEM_QUANTITY
        | ActionTypes.DECREMENT_ITEM_QUANTITY
      payload: {
        itemId: Item['id']
      }
    }
  | {
      type: ActionTypes.CHECKOUT_CART
      payload: {
        order: OrderInfo & { id: number; createdAt: Date }
      }
    }
  

// Funções de ação com validação e documentação

/**
 * Adiciona um item ao carrinho
 * @param item Item a ser adicionado
 * @throws Error se o item for inválido
 */
export function addItemAction(item: Item): Actions {
  if (!item?.id || typeof item.quantity !== 'number') {
    throw new Error('Invalid item provided for addItemAction')
  }
  
  return {
    type: ActionTypes.ADD_ITEM,
    payload: {
      item: { ...item }, // Deep copy para evitar mutação externa
    },
  }
}

/**
 * Remove um item do carrinho pelo ID
 * @param itemId ID do item a ser removido
 * @throws Error se itemId for inválido
 */
export function removeItemAction(itemId: Item['id']): Actions {
  if (!itemId || typeof itemId !== 'string') {
    throw new Error('Invalid itemId provided for removeItemAction')
  }
  
  return {
    type: ActionTypes.REMOVE_ITEM,
    payload: {
      itemId,
    },
  }
}

/**
 * Incrementa a quantidade de um item no carrinho
 * @param itemId ID do item a ser incrementado
 * @throws Error se itemId for inválido
 */
export function incrementItemQuantityAction(itemId: Item['id']): Actions {
  if (!itemId || typeof itemId !== 'string') {
    throw new Error('Invalid itemId provided for incrementItemQuantityAction')
  }
  
  return {
    type: ActionTypes.INCREMENT_ITEM_QUANTITY,
    payload: {
      itemId,
    },
  }
}

/**
 * Decrementa a quantidade de um item no carrinho
 * @param itemId ID do item a ser decrementado
 * @throws Error se itemId for inválido
 */
export function decrementItemQuantityAction(itemId: Item['id']): Actions {
  if (!itemId || typeof itemId !== 'string') {
    throw new Error('Invalid itemId provided for decrementItemQuantityAction')
  }
  
  return {
    type: ActionTypes.DECREMENT_ITEM_QUANTITY,
    payload: {
      itemId,
    },
  }
}

/**
 * Realiza o checkout do carrinho
 * @param order Informações completas do pedido (incluindo id e createdAt)
 * @throws Error se os parâmetros forem inválidos
 */
export function checkoutCartAction(order: OrderInfo & { id: number; createdAt: Date }): Actions {
  if (!order || typeof order.id !== 'number' || !(order.createdAt instanceof Date)) {
    throw new Error('Order must include id and createdAt')
  }

  return {
    type: ActionTypes.CHECKOUT_CART,
    payload: {
      order: { ...order }, // Deep copy para segurança
    },
  }
}


// Função utilitária para validação
export function isValidAction(action: unknown): action is Actions {
  if (!action || typeof action !== 'object') return false
  
  const { type, payload } = action as { type: unknown; payload: unknown }
  if (!Object.values(ActionTypes).includes(type as ActionTypes)) return false
  if (!payload || typeof payload !== 'object') return false
  
  return true
}