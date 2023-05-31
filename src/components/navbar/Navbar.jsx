import React, { useState, useEffect } from "react";
import "./navbar.css";
import { Banner, Icon } from "./imports";
import { VscMenu } from "react-icons/vsc";
import { RxCross1 } from "react-icons/rx";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillThunderbolt } from "react-icons/ai";
import { AiOutlineHome } from "react-icons/ai";
import { IoHeartSharp } from "react-icons/io5";
import { MdHelpOutline } from "react-icons/md";
import { MdDataExploration } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const MenuCategories = () => (
  <>
    <AiOutlineHome className="nav-icons" color="#000" size="1.75rem" />
    <p>
      <Link to="/">Home</Link>
    </p>
  </>
);

const MenuOnSale = () => (
  <>
    <AiFillThunderbolt className="nav-icons" color="#000" size="1.75rem" />
    <p>
      <Link to="/popularitems">Popular</Link>
    </p>
  </>
);

const MenuHistory = () => (
  <>
    <IoHeartSharp className="nav-icons" color="#000" size="1.75rem" />
    <p>
      <Link to="/liked">Liked</Link>
    </p>
  </>
);

const MenuSellWithUs = () => (
  <>
    <MdDataExploration className="nav-icons" color="#000" size="1.75rem" />
    <p>
      <a href="">Sell with us</a>
    </p>
  </>
);

const MenuHelp = () => (
  <>
    <MdHelpOutline className="nav-icons" color="#000" size="1.75rem" />
    <p>
      <a href="">Help</a>
    </p>
  </>
);

const NavBarItems = [
  <MenuCategories key={0} />,
  <MenuOnSale key={1} />,
  <MenuHistory key={2} />,
  // <MenuSellWithUs key={3} />,
  <MenuHelp key={4} />,
];

const SignUp = () => (
  <p>
    <Link to="/signup">Register</Link>
  </p>
);

const Login = () => (
  <p>
    <Link to="/login">Log In</Link>
  </p>
);

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [menuIcon, setMenuIcon] = useState(
    <VscMenu className="nav-burger-menu" color="#fff" size="1.75rem" />
  );
  const [animation, setAnimation] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  let username = "";

  if (token) {
    const decoded = jwt_decode(token);
    username = decoded.username;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const handleClick = () => {
    setToggle(!toggle);

    setMenuIcon(
      toggle ? (
        <VscMenu className="nav-burger-menu" color="#fff" size="1.75rem" />
      ) : (
        <RxCross1 className="nav-rxcross-menu" color="RED" size="1.75rem" />
      )
    );

    setAnimation(!animation);
  };

  useEffect(() => {
    const icons = document.querySelectorAll(
      ".nav-burger-menu, .nav-rxcross-menu"
    );
    icons.forEach((icon) => {
      if (animation) {
        icon.classList.add("animate");
      } else {
        icon.classList.remove("nav-burger-menu");
        icon.classList.add("nav-rxcross-menu");
        icon.classList.add("animate");
      }
    });
  }, [animation]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const search = e.target.value;
      if (search.length > 0) {
        navigate(`/search/${e.target.value}`);
      }
    }
  };

  return (
    <>
      <div className="nav">
        <img src={Banner} alt="Welcome to our page" />
        <div className="nav-links">{NavBarItems}</div>
        <input
          id="nav-search"
          type="text"
          placeholder="Search for products..."
          onKeyDown={handleKeyDown}
        />
        {menuIcon && (
          <>
            <div className="nav-burger-menu" onClick={handleClick}>
              {menuIcon}
            </div>
          </>
        )}
        {username ? (
          <>
            <div className="nav-usermenu">Hello, {username}</div>
            <p onClick={handleLogout} className="logout">
              Logout
            </p>
          </>
        ) : (
          <div className="nav-usermenu">
            <SignUp />
            <Login />
          </div>
        )}
        <Link to="/cart">
          <FaShoppingCart className="shoppingcart" />
        </Link>
      </div>
      {toggle && (
        <div className="nav-phone">
          <div className="nav-phone_items">
            <div className="nav-phone_user">
              <div className="nav-phone_user-banner">
                <img src={Icon} alt="User Icon" />
                {username ? (
                  <div className="nav-phone_user-text">
                    <p>Welcome, {username}</p>
                    <p
                      style={{ color: "black", cursor: "pointer" }}
                      onClick={handleLogout}
                    >
                      Logout
                    </p>
                  </div>
                ) : (
                  <div className="nav-phone_user-text">
                    <p>Welcome!</p>
                    <p>Login or register.</p>
                  </div>
                )}
              </div>
              {username ? null : (
                <div className="nav-phone_user-buttons">
                  <button onClick={toggle}>
                    <SignUp />
                  </button>
                  <button onClick={toggle}>
                    <Login />
                  </button>
                </div>
              )}
            </div>
            <div className="nav-phone_menu">
              <div className="nav-phone_menu-container">{NavBarItems[0]}</div>
              <div className="nav-phone_separator"></div>
              <div className="nav-phone_menu-container">{NavBarItems[1]}</div>
              <div className="nav-phone_separator"></div>
              <div className="nav-phone_menu-container">{NavBarItems[2]}</div>
              <div className="nav-phone_separator"></div>
              <div className="nav-phone_menu-container">{NavBarItems[3]}</div>
              <div className="nav-phone_separator"></div>
              <div className="nav-phone_menu-container">{NavBarItems[4]}</div>
              <div className="nav-phone_separator"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
