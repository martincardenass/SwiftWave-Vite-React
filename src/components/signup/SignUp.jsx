import React from "react";
import "./signup.css";

const SignUp = () => {
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
              <input type="submit" value="Register" className="submit-button" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
