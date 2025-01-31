import { createContext, PropsWithChildren, useContext, useReducer } from 'react'

const initWishlist: Record<
  string,
  {
    id: string
    name: string
    price: number
    qty: number
    image: string
    description: string
  }
> = {}

const wishlistContext = createContext<any>({})

type WishlistActionType = {
  type: string
  payload: {
    id: string
    name: string
    image: string
    description: string
    price: number
  }
}

const wishlistReducer = (
  state: typeof initWishlist,
  action: WishlistActionType
) => {
  switch (action.type) {
    case 'wishlist/add':
      const { id, name, description, image, price } = action.payload

      const existingItem = state[id]
      if (!existingItem)
        return {
          ...state,
          [id]: { id, name, qty: 1, description, image, price },
        }

      return state

    case 'wishlist/remove':
      const { id: pid } = action.payload

      delete state[pid]

      return { ...state }

    default:
      return state
  }
}

const WishlistContextProvider = ({ children }: PropsWithChildren) => {
  const [wishlist, wishlistDispatch] = useReducer(wishlistReducer, initWishlist)

  const valuesToShare = { wishlist, wishlistDispatch }

  return (
    <wishlistContext.Provider value={valuesToShare}>
      {children}
    </wishlistContext.Provider>
  )
}

export const useWishlist = () => {
  const { wishlist, wishlistDispatch } = useContext(wishlistContext)

  const addToWishlist = (payload: WishlistActionType['payload']) => {
    wishlistDispatch({
      type: 'wishlist/add',
      payload,
    })
  }
  const removeFromWishlist = (payload: { id: string }) => {
    wishlistDispatch({
      type: 'wishlist/remove',
      payload,
    })
  }

  return { wishlist, addToWishlist, removeFromWishlist }
}

export default WishlistContextProvider
