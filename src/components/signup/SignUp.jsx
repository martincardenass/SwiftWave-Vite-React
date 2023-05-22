import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./signup.css";

const SignUp = () => {
  const [error, setError] = useState();
  const [blink, setBlink] = useState(false);
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({
      ...data,
      [input.name]: input.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "/api/users";
      await axios.post(url, data);
      navigate("/login");
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message;
        setError(errorMessage);
      }
    }
    // console.log(res.message);
  };

  useEffect(() => {
    if (blink) {
      const timeout = setTimeout(() => {
        setBlink(false);
      }, 500);
      return () => clearTimeout(timeout);
    }
  });

  const handleBlink = () => {
    setBlink(true);
  };
  return (
    <>
      <div className="signup">
        <div className="signup-form">
          <div className="signup-form-text">
            <h1>Welcome!</h1>
            <p>
              To be able to edit, add, or modify items, please create an
              account.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <input
                type="text"
                name="username"
                onChange={handleChange}
                placeholder="Username"
                value={data.username}
                required
                className="input-email"
              />
            </div>
            <div className="input-container">
              <input
                type="text"
                name="email"
                autocomplete="new-password"
                onChange={handleChange}
                placeholder="Email"
                value={data.email}
                required
                className="input-email"
              />
            </div>
            <div className="input-container">
              <input
                type="password"
                name="password"
                autocomplete="new-password"
                onChange={handleChange}
                placeholder="Password"
                value={data.password}
                required
                className="input-password"
              />
            </div>
            <div className="input-container">
              <input
                onClick={handleBlink}
                type="submit"
                value="Register"
                className="submit-button"
              />
            </div>
            <p className={blink ? "blink small" : "small"}>{error}</p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
