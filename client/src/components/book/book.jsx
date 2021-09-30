import React, { Component } from "react";
import Bookheader from "./bookHeader";
import Booksidenav from "./bookSideNav/bookSideNav";
import Bookmain from "./bookMain/bookMain";

import moment from "moment";

class Book extends Component {
  constructor(props) {
    super(props);
    const data = this.props.location.state;

    const date = this.createDepartAndArrivalDate();

    this.state = {
      stage: 1,
      count: 1, //for counting no. of passengers in train
      train_name: data.name,
      train_no: data.train_no,
      teir: data.teir,
      depart_date: new Date(date.depart_date),
      arrival_date: new Date(date.arrival_date),
      src_stn: data.src_stn,
      des_stn: data.des_stn,
      cost: data.cost,
      passengers: [],
      mobile: "",
      availability: data.availability,
      user: {},
      paymentId: ""
    };
    this.loadUser();
  }

  loadUser = () => {
    const payload = { token: localStorage.getItem("token") };
    fetch("/user/profile/", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => res.json())
      .then(details => {
        this.setState({ user: details });
      });
  };

  createDepartAndArrivalDate = () => {
    const data = this.props.location.state;
    const depart_h = moment(data.depart_time).format("HH");
    const depart_m = moment(data.depart_time).format("mm");
    let depart_date = moment(data.date)
      .add("h", depart_h)
      .add("minute", depart_m)
      .format("YYYY-MM-DD HH:mm");

    const depart_time = new Date(data.depart_time);
    const arrival_time = new Date(data.arrival_time);
    const duration = Math.abs(depart_time - arrival_time) / (1000 * 60);
    let arrival_date = moment(depart_date)
      .add("minute", duration)
      .format("YYYY-MM-DD HH:mm");
    return { depart_date: depart_date, arrival_date: arrival_date };
  };

  countHandler = count => {
    this.setState({ count: count });
  };

  costHandler = cost => {
    this.setState({ cost: cost });
  };
  stageHandler = stage => {
    this.setState({ stage: stage });
  };

  passengersHandler = data => {
    this.setState({ passengers: data.passengers, mobile: data.mobile });
  };

  paymentHandler = id => {
    this.setState({ paymentId: id });
  };

  render() {
    return (
      <div id="book-train">
        <div id="book-header">
          <Bookheader stage={this.state.stage} />
        </div>
        <div id="book-body">
          <div id="book-main">
            <Bookmain
              {...this.props}
              count={this.countHandler}
              cost={this.costHandler}
              ticket_rate={this.state.cost}
              stage={this.state.stage}
              stageHandler={this.stageHandler}
              passengersHandler={this.passengersHandler}
              state={this.state}
              paymentHandler={this.paymentHandler}
            />
          </div>
          <div id="book-side-nav">
            <Booksidenav {...this.state} />
          </div>
        </div>
      </div>
    );
  }
}

export default Book;
