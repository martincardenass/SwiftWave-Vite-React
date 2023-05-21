import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './navbar.css'
import { Banner, Icon } from './imports';
import { VscMenu } from "react-icons/vsc";
import { RxCross1 } from "react-icons/rx";
import { FiShoppingCart } from "react-icons/fi";
import { MdOutlineDiscount } from "react-icons/md";
import { MdHistory } from "react-icons/md";
import { MdOutlineCategory } from "react-icons/md";
import { MdHelpOutline } from "react-icons/md";
import { MdDataExploration } from "react-icons/md";
import { Link } from 'react-router-dom';

const MenuCategories = () => (
  <>
    <MdOutlineCategory className='nav-icons' color='#000' size='1.75rem' />
    <p>
      <Link to='/'>Home</Link>
    </p>
  </>
)

const MenuOnSale = () => (
  <>
    <MdOutlineDiscount className='nav-icons' color='#000' size='1.75rem' /><p><a href="">On sale</a></p>
  </>
)

const  MenuHistory = () => (
  <>
  <MdHistory className='nav-icons' color='#000' size='1.75rem' /><p><a href="">History</a></p>
  </>
)

const MenuSellWithUs = () => (
  <>
    <MdDataExploration className='nav-icons' color='#000' size='1.75rem' /><p><a href="">Sell with us</a></p>
  </>
)

const MenuHelp = () => (
  <>
    <MdHelpOutline className='nav-icons' color='#000' size='1.75rem' /><p><a href="">Help</a></p>
  </>
)

const NavBarItems = [
  <MenuCategories key={0} />, <MenuOnSale key={1} />, <MenuHistory key={2} />, <MenuSellWithUs key={3} />, <MenuHelp key={4} />
]

const SignUp = () => (
  <p>
    <Link to='/signup'>Sign Up</Link>
  </p>
)

const Login = () => (
  <p>
    <Link to='/login'>Log In</Link>
  </p>
)

const Navbar = () => {
  const [toggle, setToggle] = useState(false)
  const [menuIcon, setMenuIcon] = useState(<VscMenu className='nav-burger-menu' color='#fff' size='1.75rem'/>)
  const [animation, setAnimation] =useState(false)
  
  const handleClick = () => {
    setToggle(!toggle)

    setMenuIcon(toggle
      ? <VscMenu className='nav-burger-menu' color='#fff' size='1.75rem'/>
      : <RxCross1 className='nav-rxcross-menu' color='RED' size='1.75rem'/>
    )

    setAnimation(!animation)
  }

  useEffect(() => {
    const icons = document.querySelectorAll('.nav-burger-menu, .nav-rxcross-menu')
    icons.forEach((icon) =>{
      if (animation) {
        icon.classList.add('animate')
      } else {
        icon.classList.remove('nav-burger-menu')
        icon.classList.add('nav-rxcross-menu')
        icon.classList.add('animate')
      }
    })
  }, [animation] )
  return (
    <>
      <div className="nav">
        <img src={Banner} alt="Welcome to our page" />
        <div className="nav-links">
          {NavBarItems}
        </div>
        <input  id='nav-search' type="text" placeholder='Search for products...'/>
        {
          menuIcon &&
          <>
            <div className="nav-burger-menu" onClick={handleClick}>
              {menuIcon}
            </div>
          </>
        }
        <div className="nav-usermenu">
          <SignUp /> |
          <Login />
        </div>  
      </div> 
      {toggle &&
        <div className='nav-phone'>
            <div className="nav-phone_items">
              <div className="nav-phone_user">
                <div className="nav-phone_user-banner">
                  <img src={Icon} alt="User Icon" />
                  <div className="nav-phone_user-text">
                    <p>Welcome</p>
                    <p>Login or sign up</p>
                  </div>
                </div>
                <div className="nav-phone_user-buttons">
                  <button>
                    <SignUp />
                  </button>
                  <button>
                    <Login /> 
                  </button>
                </div>
              </div>
              <div className="nav-phone_menu">
                <div className="nav-phone_menu-container">
                {NavBarItems[0]}
                </div>
                <div className="nav-phone_separator"></div>
                <div className="nav-phone_menu-container">
                  {NavBarItems[1]}
                </div>
                <div className="nav-phone_separator"></div>
                <div className="nav-phone_menu-container">
                  {NavBarItems[2]}
                </div>
                <div className="nav-phone_separator"></div>
                <div className="nav-phone_menu-container">
                  {NavBarItems[3]}
                </div>
                <div className="nav-phone_separator"></div>
                <div className="nav-phone_menu-container">
                  {NavBarItems[4]}
                </div>
                <div className="nav-phone_separator"></div>
              </div>
            </div>
          </div>
      }
    </>
  )
}

export default Navbar