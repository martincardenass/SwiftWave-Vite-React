import React from "react";
import "./main.css";

const LoadingAnim = () => {
  return (
    <div className="main">
      <div className="main_content">
        <div className="loading">
          <div className="dot-flashing"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnim;
