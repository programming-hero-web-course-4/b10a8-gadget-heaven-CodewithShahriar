import CartItem from '@/components/Cart/CartItem'
import { fetchPurchasedProducts } from '@/services/purchaseService'
import { useId } from 'react'
import { useLoaderData } from 'react-router-dom'

const Order = () => {
  const products = useLoaderData() as ReturnType<typeof fetchPurchasedProducts>

  return (
    <section>
      <header className='bg-[#9538E2] py-8'>
        <div className='con flex flex-col items-center text-white'>
          <h1 className='text-3xl font-bold'>Your Orders</h1>
          <p className='mt-2 max-w-[65ch] text-center leading-7'>
            Below, you'll find a comprehensive list of all items you've ordered
            throughout the history of your account. This includes every product,
            and relevant details associated with each order.
          </p>
        </div>
      </header>

      <div className='con mt-10'>
        <ul className='flex flex-col items-center gap-4'>
          {products?.map((product) => {
            const id = useId()

            return (
              <li
                key={`${product.id}-${id}`}
                className='w-full flex justify-center'
              >
                <CartItem
                  id={product.id}
                  name={product.name}
                  description={product.description}
                  image={product.image}
                  price={product.price}
                />
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export const loader = () => {
  return fetchPurchasedProducts()
}

export default Order
