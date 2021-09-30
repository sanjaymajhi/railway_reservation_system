import React, { Component } from "react";

import { Route, Switch } from "react-router-dom";
import Profile from "../user/Profile_register";
import Unav from "./u_nav";
import Bookedtickets from "./booked_tickets";
import Transactions from "./transactions";
import Changepass from "./change_password";

class User extends Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <div className="admin">
        <Unav />
        <Switch>
          <Route
            path="/user/profile"
            exact
            render={props => <Profile {...props} admin={false} />}
          />

          <Route path="/user/tickets" component={Bookedtickets} />

          <Route path="/user/txns" component={Transactions} />

          <Route path="/user/cpass" component={Changepass} />
        </Switch>
      </div>
    );
  }
}

export default User;
