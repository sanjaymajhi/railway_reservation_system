import React, { Component } from "react";
class Contact extends Component {
  render() {
    return (
      <div id="contact-page">
        <h1>You may contact us at : </h1>
        <p>
          <strong>Customer Care Numbers :</strong> 1234567890, 1234567890
          (Language: Hindi and English)..
        </p>
        <p>For Railway tickets booked through BookYourJourney.com</p>
        <p>General Information</p>
        <p>
          <strong>e-tickets :</strong> Sanjay@BookYourJourney.com
        </p>
        <p>
          <strong>For Cancellation E-tickets :</strong>{" "}
          etickets@BookYourJourney.com
        </p>
        <p>
          <strong>Registered Office / Corporate Office :</strong>
        </p>
        <p>Book Your Journey limited,</p>
        <p>J-83/13, Usmanpur, New Delhi 110053</p>
      </div>
    );
  }
}

export default Contact;
