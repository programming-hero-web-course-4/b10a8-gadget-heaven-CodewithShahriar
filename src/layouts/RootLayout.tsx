import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { Toaster } from '@/components/ui/toaster'
import { useEffect } from 'react'

const pageTitles: Record<string, string> = {
  '/': 'Home | Explore products.',
  '/statistics': 'Statistics | Visualize purchased products.',
  '/dashboard/cart': 'Cart | Manage cart products.',
  '/dashboard/wishlist': 'Wishlist | Manage wishlist products.',
  '/order': 'Order | Products you already purchased.',
} as const

const RootLayout = () => {
  const { pathname } = useLocation()
  const currentPageTitle = pageTitles[pathname]

  useEffect(() => {
    if (currentPageTitle) document.title = currentPageTitle
  }, [pathname])

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
        <Toaster />
      </main>
      <Footer />
    </>
  )
}

export default RootLayout
