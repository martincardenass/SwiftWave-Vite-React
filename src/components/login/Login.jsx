import React from "react";
import "../signup/signup.css";

const Login = () => {
  return (
    <>
      <div className="signup">
        <div className="signup-form">
          <div className="signup-form-text">
            <h1>Welcome!</h1>
            <p>
              Log In to an existing account.
            </p>
            <p className="small">Username: user</p>
            <p className="small">Password: password</p>
          </div>
          <form>
            <div className="input-container">
              <input type="text" placeholder="Email" className="input-email" />
            </div>
            <div className="input-container">
              <input
                type="text"
                placeholder="Password"
                className="input-password"
              />
            </div>
            <div className="input-container">
              <input type="submit" value="Log In" className="submit-button" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
