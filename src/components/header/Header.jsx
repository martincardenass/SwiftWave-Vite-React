import React from 'react'
import { HeaderBanner, HeaderBanner1 } from './imports';
import './header.css'

const Header = () => {
  return (
    <div className="header">
      <div className="header-banner">
        <img src={HeaderBanner1} alt="Welcome to our page" />
      </div>
    </div>
  )
}

export default Header