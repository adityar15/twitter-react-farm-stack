import React from 'react'
import Logo from './Logo'

export default function Header() {
  return (
    <div className="flex justify-between w-full h-24 items-center shadow-md ring-1 ring-gray-900/5">
         <Logo className="w-40 h-40 mx-7" />
    </div>
  )
}
