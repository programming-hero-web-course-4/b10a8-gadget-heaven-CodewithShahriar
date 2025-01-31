import {
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
  useReducer,
} from 'react'

interface CartItem {
  id: string
  name: string
  price: number
  qty: number
  image: string
  description: string
}

interface CartState {
  totalQty: number
  totalPrice: number
  items: Record<CartItem['id'], CartItem>
}

enum CartActions {
  add = 'cart/add',
  remove = 'cart/remove',
  reset = 'cart/reset',
}

interface CartActionsTypes {
  addToCartAction: (payload: {
    id: string
    name: string
    image: string
    description: string
    price: number
  }) => {
    type: CartActions.add
    payload: {
      id: string
      name: string
      image: string
      description: string
      price: number
    }
  }

  removeFromCartAction: (payload: { id: string }) => {
    type: CartActions.remove
    payload: {
      id: string
    }
  }

  resetCartAction: () => {
    type: CartActions.reset
  }
}

type CartActionType = {
  [K in keyof CartActionsTypes]: ReturnType<CartActionsTypes[K]>
}[keyof CartActionsTypes]

type ContextType = {
  cart: CartState
  cartDispatch: Dispatch<CartActionType>
}

const initCart: CartState = {
  totalQty: 0,
  totalPrice: 0,
  items: {},
}

const cartContext = createContext({} as ContextType)

const addToCartAction: CartActionsTypes['addToCartAction'] = (payload) => ({
  type: CartActions.add,
  payload,
})
const removeFromCartAction: CartActionsTypes['removeFromCartAction'] = (
  payload
) => ({
  type: CartActions.remove,
  payload,
})
const resetCartAction: CartActionsTypes['resetCartAction'] = () => ({
  type: CartActions.reset,
})

const cartReducer = (state: CartState, action: CartActionType) => {
  switch (action.type) {
    case CartActions.add:
      const { id, name, description, image, price } = action.payload

      const existingItem = state.items[id]
      if (!existingItem)
        return {
          ...state,
          items: {
            ...state.items,
            [id]: { id, name, qty: 1, description, image, price },
          },
          totalQty: state.totalQty + 1,
          totalPrice: parseFloat((state.totalPrice + price).toFixed(2)),
        }

      existingItem.qty++
      state.totalQty++
      state.totalPrice = parseFloat((state.totalPrice + price).toFixed(2))

      return {
        ...state,
        items: { ...state.items, [id]: existingItem },
      }

    case CartActions.remove:
      const selectedProduct = state.items[action.payload.id]
      if (!selectedProduct) return state

      const { price: p, qty: q } = selectedProduct

      const newPrice = state.totalPrice - p * q
      state.totalPrice = parseFloat(newPrice.toFixed(2))

      state.totalQty -= q
      if (state.totalQty < 1) state.totalPrice = 0

      delete state.items[action.payload.id]

      return { ...state, items: { ...state.items } }

    case CartActions.reset:
      return {
        items: {},
        totalQty: 0,
        totalPrice: 0,
      }

    default:
      return state
  }
}

const CartContextProvider = ({ children }: PropsWithChildren) => {
  const [cart, cartDispatch] = useReducer(cartReducer, initCart)

  const valuesToShare = { cart, cartDispatch }

  return (
    <cartContext.Provider value={valuesToShare}>
      {children}
    </cartContext.Provider>
  )
}

export const useCart = () => {
  const { cart, cartDispatch } = useContext(cartContext)
  const { items, totalPrice, totalQty } = cart

  const addToCart = (arg: Parameters<typeof addToCartAction>[0]) =>
    cartDispatch(addToCartAction(arg))

  const removeFromCart = (arg: Parameters<typeof removeFromCartAction>[0]) =>
    cartDispatch(removeFromCartAction(arg))

  const resetCart = () => cartDispatch(resetCartAction())

  return {
    cart: items,
    totalPrice,
    totalQty,
    addToCart,
    removeFromCart,
    resetCart,
  }
}

export default CartContextProvider
