import React, { Component } from "react";
import Booksidenavs1 from "./bookSideNavs1";
import Booksidenavs23 from "./bookSideNavs23";
class Booksidenav extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.stage === 1 ? (
          <Booksidenavs1 {...this.props} />
        ) : (
          <Booksidenavs23 {...this.props} />
        )}
      </React.Fragment>
    );
  }
}

export default Booksidenav;
