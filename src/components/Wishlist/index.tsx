import { useCart } from '@/context/CartContextProvider'
import { useWishlist } from '@/context/WishlistContextProvider'
import WishlistItem from './WishlistItem'
import NoProducts from '../NoProducts'

const Wishlist = () => {
  const { addToCart } = useCart()
  const { wishlist, removeFromWishlist } = useWishlist()

  const handleOnClose = (id: string) => {
    removeFromWishlist({
      id,
    })
  }

  const handleAddToCart = (product: Parameters<typeof addToCart>[0]) => {
    addToCart(product)
    removeFromWishlist({
      id: product.id,
    })
  }

  const productKeys = Object.keys(wishlist)

  return (
    <section>
      <div className='con py-8'>
        <header className='text-xl font-bold'>
          <h1 className='grow'>Wishlist</h1>
        </header>
      </div>

      {productKeys.length > 0 ? (
        <div className='con'>
          <ul className='flex flex-col items-center gap-4'>
            {productKeys.map((productId: string) => {
              const { id, name, description, image, price } =
                wishlist[productId]

              return (
                <li key={id} className='w-full flex justify-center'>
                  <WishlistItem
                    id={id}
                    name={name}
                    description={description}
                    image={image}
                    price={price}
                    onClose={handleOnClose}
                    onAddToCart={handleAddToCart}
                  />
                </li>
              )
            })}
          </ul>
        </div>
      ) : (
        <NoProducts />
      )}
    </section>
  )
}

export default Wishlist
