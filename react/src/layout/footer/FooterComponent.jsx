import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaLinkedin, FaInstagram, FaTwitter } from "react-icons/fa";
import ROUTES from "../../routes/ROUTES.js";
import "../../css/footerStyles.css"; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <Link to={ROUTES.HOME} className="logo-link">
          <img
            src={process.env.PUBLIC_URL + "/assets/imgs/logo4.png"}
            alt="Gadget Shop Logo"
            className="logo"
          />
        </Link>
        <div className="columnContainer">
          <div className="column">
            <h3>About Us</h3>
            <p>Learn more about our company and mission.</p>
            <Link to={ROUTES.ABOUT} className="link">
              About Us
            </Link>
          </div>
        </div>
        <div className="columnContainer">
          <div className="column">
            <h3 className="connect-title">Connect With Us</h3>
            <p className="connect-info">
              <Link to={ROUTES.CONTACTUS} className="contact-link">
                Contact Us
              </Link>
            </p>
            <div className="socialIcons">
              <a
                href="https://www.facebook.com/yourcompany"
                target="_blank"
                rel="noopener noreferrer"
                className="iconLink"
              >
                <FaFacebook className="icon" />
              </a>
              <a
                href="https://www.linkedin.com/company/yourcompany"
                target="_blank"
                rel="noopener noreferrer"
                className="iconLink"
              >
                <FaLinkedin className="icon" />
              </a>
              <a
                href="https://www.instagram.com/yourcompany"
                target="_blank"
                rel="noopener noreferrer"
                className="iconLink"
              >
                <FaInstagram className="icon" />
              </a>
              <a
                href="https://twitter.com/yourcompany"
                target="_blank"
                rel="noopener noreferrer"
                className="iconLink"
              >
                <FaTwitter className="icon" />
              </a>
            </div>
          </div>
        </div>
        <div className="columnContainer">
          <div className="column">
            <h3>Helpful Links</h3>
            <ul className="list">
              <li>
                <Link to={ROUTES.FAQ} className="link">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to={ROUTES.PRIVACYPOLICY} className="link">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bottomText">
        <p>
          &copy; {new Date().getFullYear()} Your Company. All rights reserved to
          ON LINE MALL.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
