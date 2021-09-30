import React, { Component } from "react";

class Bookmains2 extends Component {
  submitHandler = async (e) => {
    const button = document.getElementById("submitHandler");
    button.disabled = true;
    const data = this.props.state;
    const conFee = ["1A", "2A", "3A"].indexOf(data.teir) === -1 ? 15 : 35;
    const gst = (data.cost + conFee) * 0.05;
    const totalFare = (data.cost + conFee + gst) * 100;
    const receipt = {
      customer: {
        name: data.user.f_name + " " + data.user.l_name,
        email: data.user.email,
        contact: data.user.mobile,
      },
      type: "link",
      amount: totalFare,
      currency: "INR",
      description: "Payment link for your train booking.",
      sms_notify: 1,
      email_notify: 1,
    };

    await fetch("/extapi/invoices/", {
      method: "POST",
      body: JSON.stringify(receipt),
      headers: {
        "content-type": "application/json",
        authorization:
          "Basic cnpwX3Rlc3Rfa0hiVWVmN1diTVJJQ3M6dUF1UHRRRExBbXN3aEZHb0NDYklCdWZz",
      },
    })
      .then((res) => res.json())
      .then((details) => {
        this.props.paymentHandler(details.id);
      });
    this.props.stageHandler(this.props.stage + 1);
    button.disabled = false;
  };

  render() {
    const data = this.props.state;
    return (
      <React.Fragment>
        <div id="review">
          <strong>
            <p id="review-train-name">
              {data.train_name} ({data.train_no}) | Teir : {data.teir} | GENERAL
              |{" " + data.count} Travellers
            </p>
          </strong>
          <div id="review-station">
            <div>
              <p className="review-station-header">From Station</p>
              <p>
                <strong>
                  {data.src_stn.name} ({data.src_stn.code})
                </strong>
              </p>
              <p>Departure : {new Date(data.depart_date).toLocaleString()}</p>
            </div>
            <div>
              <p className="review-station-header">To Station</p>
              <p>
                <strong>
                  {data.des_stn.name} ({data.des_stn.code})
                </strong>
              </p>
              <p>Arrival : {new Date(data.arrival_date).toLocaleString()}</p>
            </div>
          </div>
          <p id="review-availability">
            <strong>
              Availability Status :{" "}
              {data.availability.seats + " / " + data.availability.status}
            </strong>
          </p>
          <div>
            <div id="review-passenger">
              <div id="review-passenger-header">
                <strong> Travelling Passengers</strong>
              </div>
              {data.passengers.map((passenger) => (
                <div className="review-passenger-detail" key={passenger.id}>
                  Name : {passenger.name} | Age : {passenger.age} | Food :{" "}
                  {passenger.food} | Gender : {passenger.gender}
                  {" | "}
                  {passenger.age >= 60 ? "Senior citizen concession given" : ""}
                </div>
              ))}
            </div>
          </div>
          <button id="submitHandler" onClick={this.submitHandler}>
            Continue
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default Bookmains2;
