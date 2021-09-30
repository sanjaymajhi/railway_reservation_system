import React, { Component } from "react";

import { Route, Switch } from "react-router-dom";
import Anav from "./admin_nav";
import Train from "../train/train";
import T_Route from "../route/route";
import Station from "../station/station";
import Profile from "../user/Profile_register";

class Admin extends Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <div className="admin">
        <Anav />

        <Switch>
          <Route
            path="/admin/"
            exact
            render={props => <Profile {...props} admin={true} />}
          />
          {/* train routes */}

          <Route path="/admin/train/create" component={Train} />

          {/* train_route routes */}

          <Route path="/admin/route/create" component={T_Route} />

          {/* station routes */}

          <Route path="/admin/station/create" component={Station} />
        </Switch>
      </div>
    );
  }
}

export default Admin;
