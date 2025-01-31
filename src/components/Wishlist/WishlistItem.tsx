import { useToast } from '@/hooks/use-toast'
import { Button } from '../ui/button'

interface Product {
  id: string
  name: string
  image: string
  description: string
  price: number
}

interface WishlistItemProp extends Product {
  onClose?: (id: string) => void
  onAddToCart: (product: Product) => void
}

const WishlistItem = ({
  id,
  name,
  description,
  image,
  price,
  onClose,
  onAddToCart,
}: WishlistItemProp) => {
  const { toast } = useToast()

  const handleRemoveFromWishlist = () => {
    onClose?.(id)
  }
  const handleAddToCart = () => {
    onAddToCart({
      id,
      name,
      description,
      image,
      price,
    })
    toast({
      title: `${name} is added to cart.`,
      description: `Cart price is increased by $${price}`,
    })
  }

  return (
    <div className='wishlist-item bg-white p-4 rounded-2xl relative w-min md:w-full md:flex gap-4'>
      <figure className='w-64 lg:w-52 aspect-[1.6/1] rounded-2xl overflow-hidden'>
        <img className='w-full h-full object-cover' src={image} alt={name} />
      </figure>
      <div className='details mt-3 md:mt-0 flex gap-2 flex-col justify-between'>
        <h1 className='text-xl md:text-2xl font-semibold'>{name}</h1>
        <p className='text-sm md:text-lg text-slate-500'>{description}</p>
        <span className='text-md md:text-xl font-semibold text-slate-800'>
          Price: ${price}
        </span>
        <Button onClick={handleAddToCart} className='w-max rounded-full'>
          Add To Cart
        </Button>
      </div>
      {onClose && (
        <Button
          onClick={handleRemoveFromWishlist}
          variant={'ghost'}
          className='rounded-full w-10 h-10 bg-slate-50/25 text-white absolute top-4 right-4 md:static md:border md:border-red-500 md:bg-transparent md:text-slate-900 md:ml-auto'
        >
          X
        </Button>
      )}
    </div>
  )
}

export default WishlistItem
