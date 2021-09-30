import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/user/Login";
import Profile from "./components/user/Profile_register";
import Contact from "./components/contact";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./index.css";
import Admin from "./components/admin/admin";
import Search from "./components/search/search";
import Book from "./components/book/book";
import User from "./components/user/user";
import Ticket from "./components/ticket/ticket";
import PNR from "./components/ticket/pnr";
import About from "./components/about";
import Faq from "./components/faq";

class App extends Component {
  state = {
    token: localStorage.getItem("token"),
    admin: Boolean
  };
  tokenhandler = (token, admin) => {
    this.setState({ token: token, admin: admin });
  };
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar
            handleToken={this.tokenhandler}
            token={this.state.token}
            admin={this.state.admin}
          />
          <Switch>
            <Route path="/" exact component={Home} />

            {/* user routes */}

            <Route
              path="/user/login"
              render={props => (
                <Login {...props} handleToken={this.tokenhandler} />
              )}
            />
            <Route path="/user/register" component={Profile} />
            <Route path="/user/logout" component={Home} />

            <Route path="/search" render={props => <Search {...props} />} />

            <Route path="/admin/" render={props => <Admin {...props} />} />
            <Route path="/user/" render={props => <User {...props} />} />

            {/* ticket routes */}
            <Route path="/book/" component={Book} />
            <Route path="/ticket/" component={Ticket} />
            <Route path="/pnr/" component={PNR} />

            {/* other routes */}
            <Route path="/faq" component={Faq} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
