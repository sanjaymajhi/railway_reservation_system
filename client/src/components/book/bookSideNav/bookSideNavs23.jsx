import React, { Component } from "react";
import { toWords } from "number-to-words";
class Booksidenavs23 extends Component {
  render() {
    const conFee = ["1A", "2A", "3A"].indexOf(this.props.teir) === -1 ? 15 : 35;
    const gst = (this.props.cost + conFee) * 0.05;
    const totalFare = this.props.cost + conFee + gst;

    return (
      <React.Fragment>
        <div id="ticket">
          <div>
            <div>BookYourJourney.com</div>
            <p>
              <strong>
                {this.props.train_name} ({this.props.train_no})
              </strong>
            </p>
            <p>
              {this.props.teir}, GENERAL Quota, {this.props.count} Travellers
            </p>
            <ul>
              <li>Ticket Fare </li>
              <li>: {"Rs. " + this.props.cost}</li>
              <li>
                Convenience Fee
                {}
              </li>
              <li>: {"Rs. " + conFee}</li>
              <li>GST </li>
              <li>: {"Rs. " + gst}</li>
              <hr style={{ gridColumn: "span 2", margin: "5px 0" }} />
              <li>
                <strong> Total Fare </strong>
              </li>
              <li>: {"Rs. " + totalFare} </li>
            </ul>

            <p>
              <strong>RUPEES {toWords(totalFare).toUpperCase()}</strong>{" "}
            </p>
            <p>Note: ticket price includes concessions and food price.</p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Booksidenavs23;
