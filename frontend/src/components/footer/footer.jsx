import React from "react";
import './footer.css'

class Footer extends React.Component {
  render() {
    return (
      <div className="footer-container">
        <div className="footer-names">

        <a className="footer-links" href="https://www.github.com/cperea1995">
          <div className="github-links">
            <div className="name">Christian Perea</div>
            <div className="github"></div>
          </div>
        </a>

        <a className="footer-links" href="https://www.github.com/sarjil">
          <div className="github-links">
            <div className="name">Sarjil Miah</div>
            <div className="github"></div>
          </div>
        </a>

        <a className="footer-links" href="https://www.github.com/kunzels">
          <div className="github-links">
            <div className="name">Steven Kunzel</div>
            <div className="github"></div>
          </div>
        </a>

        <a className="footer-links" href="https://www.github.com/StevenYee123">
          <div className="github-links">
            <div className="name">Steven Yee</div>
            <div className="github"></div>
          </div>
        </a>

        </div>

        <div className="footer-footer">
          <footer>Copyright &copy; 2020 WhereToFeast.</footer>
        </div>
      </div>
    );
  }
}

export default Footer;
