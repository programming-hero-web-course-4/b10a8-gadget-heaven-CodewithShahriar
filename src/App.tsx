import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Cart from './components/Cart'
import Wishlist from './components/Wishlist'
import CartContextProvider from './context/CartContextProvider'
import WishlistContextProvider from './context/WishlistContextProvider'
import RootLayout from './layouts/RootLayout'
import Dashboard from './pages/Dashboard'
import Home, { loader as homeDataLoader } from './pages/Home'
import NotFound from './pages/NotFound'
import Order, { loader as orderDataLoader } from './pages/Order'
import ProductDetails, {
  loader as productDataLoader,
} from './pages/ProductDetails'
import Statistics, { loader as statisticsDataLoader } from './pages/Statistics'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Home />,
        loader: homeDataLoader,
      },
      {
        path: '/product/:productId',
        element: <ProductDetails />,
        errorElement: <h1>Err</h1>,
        loader: productDataLoader,
      },
      {
        path: '/statistics',
        element: <Statistics />,
        loader: statisticsDataLoader,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
        children: [
          {
            path: '/dashboard',
            element: <Navigate to={'/dashboard/cart'} />,
          },
          {
            path: '/dashboard/cart',
            element: <Cart />,
          },
          {
            path: '/dashboard/wishlist',
            element: <Wishlist />,
          },
        ],
      },
      {
        path: '/order',
        element: <Order />,
        loader: orderDataLoader,
      },
    ],
  },
])

const App = () => {
  return (
    <CartContextProvider>
      <WishlistContextProvider>
        <RouterProvider router={router} />
      </WishlistContextProvider>
    </CartContextProvider>
  )
}

export default App
