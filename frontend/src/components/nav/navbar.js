import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }

  getLinks() {
    if (this.props.loggedIn) {
      return (
        <div>
          <Link to={"/profile"} className="session-links">
            Profile
          </Link>
          <button onClick={this.logoutUser} className="session-links logout-btn">
            Logout
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <Link className="session-links" to={"/signup"}>Signup     </Link>
          <Link className="session-links" to={"/login"}>Login</Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="navbar">
        <div></div>
        <div className="navbar-header"> 
          <Link to="/" className="navbar-title">Where to Feast</Link>
        </div>

        <div className="navbar-links">
          {this.getLinks()}
        </div>

      </div>
    );
  }
}

export default NavBar;
