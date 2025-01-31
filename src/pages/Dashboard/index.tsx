import { Link, Outlet, useLocation } from 'react-router-dom'

const Dashboard = () => {
  const location = useLocation()
  const path = location.pathname === '/dashboard/cart' ? 'cart' : 'wishlist'

  return (
    <section>
      <header className='bg-[#9538E2] py-8'>
        <div className='con flex flex-col items-center text-white'>
          <h1 className='text-3xl font-bold'>Dashboard</h1>
          <p className='mt-2 max-w-[65ch] text-center leading-7'>
            Discover and explore the latest gadgets all in one place. From
            cutting-edge smart devices to top accessories, find everything you
            need to upgrade your experience and stay ahead in tech!
          </p>

          <ul className='btn-group flex gap-8 mt-8'>
            <li>
              <Link
                to={'/dashboard/cart'}
                className={path === 'cart' ? 'cta-btn active' : 'cta-btn'}
              >
                Cart
              </Link>
            </li>
            <li>
              <Link
                to={'/dashboard/wishlist'}
                className={path === 'wishlist' ? 'cta-btn active' : 'cta-btn'}
              >
                Wishlist
              </Link>
            </li>
          </ul>
        </div>
      </header>

      <div className='content'>
        <Outlet />
      </div>
    </section>
  )
}

export default Dashboard
