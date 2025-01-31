import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  useEffect(() => {
    document.title = '404 | Page not found.'
  }, [])

  return (
    <div className='w-full h-full flex flex-col gap-4 items-center justify-center'>
      <h1 className='text-xl'>404 | Page Not Found</h1>
      <Link to='/' className='underline text-green-600'>
        Go To Home
      </Link>
    </div>
  )
}

export default NotFound
