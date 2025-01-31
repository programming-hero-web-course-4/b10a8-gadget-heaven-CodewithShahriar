import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='mt-14 py-12 bg-white'>
      <div className='con'>
        <header className='flex flex-col items-center'>
          <h2 className='text-3xl font-bold'>Gadget Heaven</h2>
          <p className='font-medium text-gray-500 mt-3'>
            Leading the way in cutting-edge technology and innovation.
          </p>
        </header>

        <section className='links grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:justify-items-center mt-8 text-gray-500'>
          <div className='support'>
            <h4 className='text-lg font-bold text-slate-900'>Services</h4>
            <ul className='mt-4 flex flex-col gap-2'>
              <li>
                <Link to={'/product_support'}>Product Support</Link>
              </li>
              <li>
                <Link to={'/order_tracking'}>Order Tracking</Link>
              </li>
              <li>
                <Link to={'/shipping_dr'}>Shipping & Delivery Returns</Link>
              </li>
            </ul>
          </div>
          <div className='about-us'>
            <h4 className='text-lg font-bold text-slate-900'>Company</h4>
            <ul className='mt-4 flex flex-col gap-2'>
              <li>
                <Link to={'/about_us'}>About Us</Link>
              </li>
              <li>
                <Link to={'/careers'}>Careers</Link>
              </li>
              <li>
                <Link to={'/contact'}>Contact</Link>
              </li>
            </ul>
          </div>
          <div className='policy'>
            <h4 className='text-lg font-bold text-slate-900'>Legal</h4>
            <ul className='mt-4 flex flex-col gap-2'>
              <li>
                <Link to={'/tos'}>Terms of Service</Link>
              </li>
              <li>
                <Link to={'/privacy_policy'}>Privacy Policy</Link>
              </li>
              <li>
                <Link to={'/cookie_policy'}>Cookie Policy</Link>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </footer>
  )
}

export default Footer
