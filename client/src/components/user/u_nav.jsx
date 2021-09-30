import React, { Component } from "react";
import { Link } from "react-router-dom";
class Unav extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className="a_nav">
        <h2>Menu</h2>
        <Link to="/">
          <p>
            {" "}
            <i className="material-icons">search</i> Search Train{" "}
          </p>
        </Link>
        <Link to="/user/tickets">
          <p>
            <i className="material-icons">local_activity</i> Your Tickets{" "}
          </p>
        </Link>
        <Link to="/user/txns">
          <p>
            <i className="material-icons">update</i>Transactions{" "}
          </p>
        </Link>
        <Link to="/user/cpass">
          <p>
            <i className="material-icons">mode_edit</i> Change Pwd{" "}
          </p>
        </Link>
      </div>
    );
  }
}

export default Unav;
