import React, { Component } from "react";
import { Link } from "react-router-dom";
import rail_icon from "../images/rail_icon.png";

import Clock from "react-live-clock";
class Navbar extends Component {
  logout = e => {
    this.props.handleToken(null);
    localStorage.removeItem("token");
  };
  date = new Date();
  render() {
    return (
      <div className="navbar">
        <div className="nav1">
          <Link className="nav-left" to="/">
            <p>
              <span>
                <img src={rail_icon} alt="logo" />
              </span>
              {"  "}
              BookYourJourney.com
            </p>
          </Link>
          {!this.props.token ? (
            <ul id="navdiv1">
              <Link to="/user/login">
                <li>Login</li>
              </Link>
              <Link to="/user/register">
                <li>Register</li>
              </Link>
            </ul>
          ) : this.props.admin === true ? (
            <ul id="navdiv2">
              <Link to="/admin/">
                <li>Profile</li>
              </Link>
              <li>
                <a href="/" onClick={this.logout}>
                  Log Out
                </a>
              </li>
            </ul>
          ) : (
            <ul id="navdiv2">
              <Link to="/user/profile">
                <li>Profile</li>
              </Link>
              <li>
                <a href="/" id="logout" onClick={this.logout}>
                  Log Out
                </a>
              </li>
            </ul>
          )}
        </div>
        <div className="nav2">
          <ul>
            <li>
              {this.date.toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric"
              })}
              {" ["}
              <Clock format={"HH:mm:ss"} />
              {"]"}
            </li>
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/pnr">
              <li>PNR status</li>
            </Link>
            <Link to="/faq/">
              <li>FAQ</li>
            </Link>

            <Link to="/about/">
              <li>About</li>
            </Link>

            <Link to="/contact/">
              <li>Contact</li>
            </Link>
          </ul>
        </div>
      </div>
    );
  }
}

export default Navbar;
