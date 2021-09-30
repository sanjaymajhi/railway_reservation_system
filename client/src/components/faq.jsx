import React, { Component } from "react";
class Faq extends Component {
  render() {
    return (
      <div className="faq-page">
        <h2>FAQs</h2>
        <p>
          <strong>Q- </strong>How is ticket cost determined ?
          <br />
          <strong>Ans. </strong>Ticket price of sleeper class is base price of
          that train ticket.
          <br />
          1A = 2.5 * base price
          <br />
          2A = 2 * base price
          <br />
          3A = 1.5 * base price
          <br />
          CC = 0.5 * base price
        </p>
        <p>
          <strong>Q- </strong>What is the price of food ?
          <br />
          <strong>Ans. </strong>For Veg,it is 80rs per passenger. <br />
          For Non-Veg, it is 130rs per passenger.
        </p>
        <p>
          <strong>Q- </strong>Is there any concession for senior citizens?
          <br />
          <strong>Ans. </strong>Yes, for senior citizens there is a concession
          of 50% of ticket price, it will be auto applied, if passenger age is
          greater than or equal to 60.
        </p>
        <p>
          <strong>Q- </strong>What is covenience fee ?
          <br />
          <strong>Ans. </strong>It is 15rs for SL and CC tickets and 35rs for
          1A, 2A, 3A tickets.
        </p>
        <p>
          <strong>Q- </strong>What is the gst on tickets?
          <br />
          <strong>Ans. </strong> It is 5% of the total ticket price.
        </p>
      </div>
    );
  }
}

export default Faq;
