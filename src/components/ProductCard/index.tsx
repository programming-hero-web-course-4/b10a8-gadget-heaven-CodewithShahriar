import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'

export interface ProductCardProps {
  productId: string
  title: string
  description: string
  image: string
}

const ProductCard = ({
  productId,
  title,
  description,
  image,
}: ProductCardProps) => {
  return (
    <Card className='max-w-[480px] p-3 overflow-hidden'>
      <figure className='w-full aspect-[16/10] rounded-md overflow-hidden'>
        <img className='w-full h-full object-cover' src={image} alt='laptop' />
      </figure>
      <CardHeader className='p-0 mt-6'>
        <CardTitle>{title}</CardTitle>
        <CardDescription className='mt-3 text-wrap'>
          {description}
        </CardDescription>
      </CardHeader>

      <Button
        className='mt-4 rounded-full text-[#9538E2] border-[#9538E2] text-lg font-semibold'
        variant={'outline'}
      >
        <Link to={`/product/${productId}`}>View Details</Link>
      </Button>
    </Card>
  )
}

export default ProductCard
