import { Link } from 'react-router-dom'
import Search from './Search'

export default function Navbar(props) {
  const { darkTheme, setDarkTheme } = props

  return (
    <div className='p-5 pb-5 flex flex-wrap sm:justify-between justify-center items-center border-b dark:border-gray-700 border-gray-200'>
      <div className='flex justify-between items-center space-x-5 w-screen'>
        <Link to="/">
          <p className='text-2xl text-black font-quicksand font-normal rounded dark:text-white py-1 px-2'>
            Enceladus 🇮🇩
          </p>
        </Link>
        <button type="button" className='font-bold font-quicksand text-xl text-white py-1 px-3 rounded-full bg-gray-900 dark:bg-gray-50 dark:text-gray-900 hover:shadow-md' onClick={() => setDarkTheme(!darkTheme)}>
          {darkTheme ? '☀️' : '🌙'}
        </button>
      </div>
      <Search />
    </div>
  )
}
