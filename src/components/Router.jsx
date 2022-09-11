import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Results from './Results'

export default function Router() {
  const routes = ['/search', '/image', '/news', '/video']
  return (
    <div className='p-4'>
      <Routes>
        <Route path='/' element={<Navigate to="/search" replace={true} />} />
        {routes.map(route => (
          <Route path={route} element={<Results />} />
        ))}
      </Routes>
    </div>
  )
}
