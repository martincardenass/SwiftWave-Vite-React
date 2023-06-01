import "./footer.css";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-icons">
          <a href="https://github.com/ItamCrdns" target="_blank">
            <AiFillGithub />
          </a>
          <a href="https://www.linkedin.com/in/itamcrdns/" target="_blank">
            <AiFillLinkedin />
          </a>
        </div>
        <div className="footer-text">
          <p>Created by Martin Cardenas</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
