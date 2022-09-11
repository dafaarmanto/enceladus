import React from 'react'
import { NavLink } from 'react-router-dom'

const links = [
  { url: '/search', text: 'All' },
  { url: '/image', text: 'Images' },
  { url: '/news', text: 'News' },
  { url: '/video', text: 'Videos' },
]

export default function Links() {
  return (
    <div className='flex sm:justify-around justify-between items-center mt-4'>
      {links.map(({ url, text }) => (
        <NavLink to={url} className={({ isActive }) => isActive ? "font-quicksand font-bold text-blue-700 border-b-2 m-2 dark:text-gray-200 border-blue-700 pb-0" : 'font-quicksand m-2 dark:text-gray-300 hover:text-gray-500'}>
          {text}
        </NavLink>
      ))}
    </div>
  )
}
