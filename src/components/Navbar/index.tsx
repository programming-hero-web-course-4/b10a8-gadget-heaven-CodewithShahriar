import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/CartContextProvider'
import { useWishlist } from '@/context/WishlistContextProvider'
import { NavLink, useLocation } from 'react-router-dom'
import { Badge } from '../ui/badge'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet'

const Navbar = () => {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className={`con nav-con ${isHome && 'home'} md:mt-8`}>
      <nav className='flex gap-8 items-center justify-between '>
        <NavLink to='/' className='logo  order-1'>
          <h1 className='font-bold text-xl'>Gadget Heaven</h1>
        </NavLink>

        {/* Hamburger Menu */}
        <div className='order-3 lg:hidden'>
          <NavDrawer />
        </div>

        <NavLinks className='order-2 hidden lg:block' />

        <PopOver className='order-2 lg:order-3 hidden md:block ms-auto lg:m-0' />
      </nav>
    </div>
  )
}

const NavLinks = (prop: Record<string, string>) => {
  return (
    <div {...prop}>
      <ul className='nav-links'>
        <li>
          <NavLink to='/'>
            <Button variant={'link'} size={'lg'}>
              Home
            </Button>
          </NavLink>
        </li>
        <li>
          <NavLink to='/statistics'>
            <Button variant={'link'} size={'lg'}>
              Statistics
            </Button>
          </NavLink>
        </li>
        <li>
          <NavLink to='/dashboard'>
            <Button variant={'link'} size={'lg'}>
              Dashboard
            </Button>
          </NavLink>
        </li>
        <li>
          <NavLink to='/order'>
            <Button variant={'link'} size={'lg'}>
              Order
            </Button>
          </NavLink>
        </li>
      </ul>
    </div>
  )
}
const PopOver = (prop: Record<string, string>) => {
  const { wishlist } = useWishlist()
  const { cart, totalQty } = useCart()

  const cartProductIds = Object.keys(cart)
  const wishlistProductIds = Object.keys(wishlist)
  const wishlistQty = wishlistProductIds.length

  return (
    <div {...prop}>
      <ul className='pop-overs flex items-center gap-8'>
        <li>
          <HoverCard>
            <HoverCardTrigger>
              <div className='relative'>
                <Button
                  variant={'ghost'}
                  className='w-max p-0 m-0 rounded-full'
                >
                  <Avatar className='border p-1.5'>
                    <AvatarImage src='/cart-icon.png' alt='cart-icon' />
                    <AvatarFallback>Cart</AvatarFallback>
                  </Avatar>
                </Button>
                <Badge variant='default' className='absolute -top-1 -right-2'>
                  {totalQty}
                </Badge>
              </div>
            </HoverCardTrigger>
            <HoverCardContent
              className={totalQty > 0 ? 'hidden md:block w-auto' : 'hidden'}
            >
              <ul>
                {cartProductIds.map((productId) => (
                  <li
                    key={cart[productId].id}
                    className='flex gap-6 items-center justify-between text-nowrap mt-2'
                  >
                    <span>{cart[productId].name}</span>
                    <span className='ml-auto'>X</span>
                    <span>{cart[productId].qty}</span>
                  </li>
                ))}
              </ul>
            </HoverCardContent>
          </HoverCard>
        </li>
        <li>
          <HoverCard>
            <HoverCardTrigger>
              <div className='relative'>
                <Button
                  variant={'ghost'}
                  className='w-max p-0 m-0 rounded-full'
                >
                  <Avatar className='border p-1.5'>
                    <AvatarImage src='/wishlist-icon.png' alt='wishlist-icon' />
                    <AvatarFallback>Cart</AvatarFallback>
                  </Avatar>
                </Button>
                <Badge variant='default' className='absolute -top-1 -right-2'>
                  {wishlistQty}
                </Badge>
              </div>
            </HoverCardTrigger>
            <HoverCardContent
              className={wishlistQty > 0 ? 'hidden md:block w-auto' : 'hidden'}
            >
              <ul>
                {wishlistProductIds.map((productId) => (
                  <li
                    key={wishlist[productId].id}
                    className='flex gap-6 items-center justify-between text-nowrap mt-2'
                  >
                    {wishlist[productId].name}
                  </li>
                ))}
              </ul>
            </HoverCardContent>
          </HoverCard>
        </li>
      </ul>
    </div>
  )
}
const NavDrawer = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <span className='hamburger-icon  w-10 rounded-md aspect-square flex items-center justify-between flex-col p-2'>
          <img
            className='w-full aspect-square'
            src='/hamburger-icon.png'
            alt='hamburger'
          />
        </span>
      </SheetTrigger>
      <SheetContent>
        <div className='hidden'>
          <SheetHeader>
            <SheetTitle>Mobile Navigation?</SheetTitle>
            <SheetDescription>
              Easier navigation for mobile phone.
            </SheetDescription>
          </SheetHeader>
        </div>

        <div className='flex flex-col items-center gap-5 mt-8'>
          <NavLinks />
          <span className='block md:hidden'>
            <PopOver />
          </span>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default Navbar
