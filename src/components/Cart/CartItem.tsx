import { Button } from '../ui/button'

interface CartItemProp {
  id: string
  name: string
  image: string
  description: string
  price: number
  onClose?: (id: string) => void
}

const CartItem = ({
  id,
  name,
  description,
  image,
  price,
  onClose,
}: CartItemProp) => {
  const handleRemoveFromCart = () => {
    onClose?.(id)
  }

  return (
    <div className='cart-item bg-white p-4 rounded-2xl relative w-min md:w-full md:flex gap-4'>
      <figure className='w-64 lg:w-52 aspect-[1.6/1] rounded-2xl overflow-hidden'>
        <img className='w-full h-full object-cover' src={image} alt={name} />
      </figure>
      <div className='details mt-3 md:mt-0 flex gap-2 flex-col justify-between'>
        <h1 className='text-xl md:text-2xl font-semibold'>{name}</h1>
        <p className='text-sm md:text-lg text-slate-500'>{description}</p>
        <span className='text-md md:text-xl font-semibold text-slate-800'>
          Price: ${price}
        </span>
      </div>
      {onClose && (
        <Button
          onClick={handleRemoveFromCart}
          variant={'ghost'}
          className='rounded-full w-10 h-10 bg-slate-50/25 text-white absolute top-4 right-4 md:static md:border md:border-red-500 md:bg-transparent md:text-slate-900 md:ml-auto'
        >
          X
        </Button>
      )}
    </div>
  )
}

export default CartItem
