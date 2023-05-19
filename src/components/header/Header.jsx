import React from 'react'
import './header.css'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  return (
    <div className="header">
      <h1>Welcome! Select what you want to do</h1>
      <div className="header-content">
        <button onClick={() => (navigate('/createitem'))}>Create item</button>
        <button onClick={() => (navigate('/deleteitem'))}>Delete item</button>
        <button onClick={() => (navigate('/updateitem'))}>Update existing item</button>
      </div>
    </div>
  )
}

export default Header