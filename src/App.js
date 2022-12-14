import { useState } from 'react'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Router from './components/Router'

export default function App() {
  const [darkTheme, setDarkTheme] = useState(false);

  return (
    <div className={darkTheme ? 'dark': 'light'}>
      <div className='bg-gray-50 dark:bg-gray-900 dark:text-gray-200 min-h-screen'>
        <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
        <Router />
        <Footer />
      </div>
    </div>
  )
}
