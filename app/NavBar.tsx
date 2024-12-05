import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
      <nav className = 'flex space'>
            <ul className = 'flex space-x-6'>
                  <li><Link href="/">Dashboard</Link></li>
                  <li><Link href="/something">Something</Link></li>
            </ul>
      </nav>
  )
}

export default Navbar