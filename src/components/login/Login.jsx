import React, { useState, useEffect } from "react";
import axios from "axios";
import "../signup/signup.css";

const SignUp = () => {
  const [error, setError] = useState();
  const [blink, setBlink] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = ({ currentTarget: input }) => {
    setData({
      ...data,
      [input.name]: input.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      window.location = "/"; //!Change to Navigate React
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message;
        setError(errorMessage);
      }
    }
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
            <p>Sign In to your account</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <input
                type="text"
                name="email"
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
                value="Log In"
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
