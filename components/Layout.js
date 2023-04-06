import React from 'react'
import Navbar from './Navbar'

function Layout({children}) {
  return (
    <div className=''>
        <Navbar />
    <div className='bg-blue-200'>
        {children}
    </div>
    </div>
  )
}

export default Layout