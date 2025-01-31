import { useCart } from '@/context/CartContextProvider'
import { savePurchasedProducts } from '@/services/purchaseService'
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import CartItem from './CartItem'
import NoProducts from '../NoProducts'

const Cart = () => {
  const navigate = useNavigate()

  const { cart, removeFromCart, totalPrice, resetCart, totalQty } = useCart()
  const productIds = Object.keys(cart)

  const sortType = useSearchParams(useLocation().search)[0].get('sort')

  const filteredCartIds = productIds.sort((productId1, productId2) => {
    if (sortType === 'desc') {
      if (cart[productId1].price > cart[productId2].price) return -1
      if (cart[productId1].price < cart[productId2].price) return 1
      return 0
    }

    if (cart[productId1].price > cart[productId2].price) return 1
    if (cart[productId1].price < cart[productId2].price) return -1
    return 0
  })

  const handleOnClose = (id: string) => {
    removeFromCart({ id })
  }

  const handlePurchaseClick = (isOpen: boolean) => {
    if (totalQty < 1) return

    if (isOpen) savePurchasedProducts(cart)

    if (!isOpen) {
      resetCart()
      navigate('/')
    }
  }

  return (
    <section>
      <div className='con py-8'>
        <header className='flex flex-col md:flex-row gap-6 items-center text-xl font-bold'>
          <h1 className='grow'>Cart</h1>
          {totalQty > 0 && (
            <>
              <h2>Total Cost: ${totalPrice}</h2>
              <div className='p-[2px]  bg-gradient-to-r from-blue-500 to-pink-500 w-max rounded-full'>
                <Link
                  to={`?sort=${sortType === 'desc' ? 'asc' : 'desc'}`}
                  className='flex py-2 px-4 gap-2 text-lg bg-white font-semibold text-[#8332C6] hover:text-[#8332C6] rounded-full'
                >
                  <span>Sort by Price</span>
                  <img
                    className='w-6 aspect-square'
                    src='/sort-icon.png'
                    alt='sort'
                  />
                </Link>
              </div>

              <Dialog onOpenChange={handlePurchaseClick}>
                <DialogTrigger className='rounded-full text-lg font-semibold border-2 text-white  bg-gradient-to-t from-[#E066E6] to-[#9532E5] hover:text-slate-300 px-5 py-2'>
                  Purchase
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader className='flex items-center gap-2'>
                    <img
                      className='w-16 aspect-square'
                      src='/tick-mark.png'
                      alt='tick'
                    />
                    <DialogTitle className='text-center'>
                      Payment Successful
                    </DialogTitle>
                    <DialogDescription className='flex flex-col items-center gap-1'>
                      <span>Thanks for purchasing.</span>
                      <span>Total: ${totalPrice}</span>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </>
          )}
        </header>
      </div>

      <div className='con'>
        <ul className='flex flex-col items-center gap-4'>
          {filteredCartIds.map((productId) => {
            const { name, id, description, image, price } = cart[productId]
            return (
              <li key={id} className='w-full flex justify-center'>
                <CartItem
                  id={id}
                  name={name}
                  description={description}
                  image={image}
                  price={price}
                  onClose={handleOnClose}
                />
              </li>
            )
          })}
        </ul>
      </div>
      {totalQty < 1 && <NoProducts />}
    </section>
  )
}

export default Cart
