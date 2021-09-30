import React, { Component } from "react";

import p_detail from "../../images/p_detail.png";
import review from "../../images/review.png";
import payment from "../../images/payment.png";

class Bookheader extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.stage === 1 ? (
          <img src={p_detail} alt="Personal detail" />
        ) : this.props.stage === 2 ? (
          <img src={review} alt="Review" />
        ) : (
          <img src={payment} alt="Payment" />
        )}
      </React.Fragment>
    );
  }
}

export default Bookheader;
