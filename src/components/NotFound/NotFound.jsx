import React from "react";
import { Link } from "react-router-dom";
import "./notfound.css";

const NotFound = () => {
  return (
    <div className="notfound">
      <div className="notfound_content">
        <h1>404</h1>
        <h2>Page not found</h2>
        <div className="text">
          <Link to="/">
            <p>Go Home</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
