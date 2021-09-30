import React, { Component } from "react";
import Bookmains1 from "./bookMains1";
import Bookmains2 from "./bookMains2";
import Bookmains3 from "./bookMains3";
class Bookmain extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.stage === 1 ? (
          <Bookmains1 {...this.props} />
        ) : this.props.stage === 2 ? (
          <Bookmains2 {...this.props} />
        ) : (
          <Bookmains3 {...this.props} />
        )}
      </React.Fragment>
    );
  }
}

export default Bookmain;
