import React, { Component } from "react";
import moment from "moment";

class Searchresults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      class: ""
    };
  }

  classHandler = async e => {
    e.preventDefault();
    if (this.state.class !== "") {
      let button = document.getElementById(this.state.class);
      button.style.border = "1px solid lightgray";
      button.style.color = "#008cff";
    }
    e.target.style.border = "1px solid green";
    e.target.style.color = "green";
    await this.setState({ class: e.target.id });
  };

  teirPrice = (cost, teir) => {
    switch (teir) {
      case "1A":
        cost *= 2.5;
        break;
      case "2A":
        cost *= 2;
        break;
      case "3A":
        cost *= 1.5;
        break;
      case "CC":
        cost *= 0.5;
        break;
      default:
        cost *= 1;
    }
    return cost;
  };

  bookHandler = e => {
    e.preventDefault();
    const div = document.getElementById(
      "nearby-date-results" + this.props.train._id
    );
    div.style.display = "grid";
    const overlay = document.querySelector(".overlay");
    overlay.style.display = "block";

    const depart_h = moment(this.props.train.depart_time).format("HH");
    const depart_m = moment(this.props.train.depart_time).format("mm");
    let depart_date = moment(this.props.date)
      .add("h", depart_h)
      .add("minute", depart_m)
      .format("YYYY-MM-DD HH:mm");

    const payload = { id: this.props.train._id, date: depart_date };
    fetch("/booking/train/status/", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(res => res.json())
      .then(availabilty => {
        const overlay = document.querySelector(".overlay");
        overlay.style.display = "none";
        const button = document.getElementById(
          "availability" + this.props.train._id
        );
        button.style.display = "none";
        const div = document.getElementById(
          "availability-div" + this.props.train._id
        );
        if (availabilty.status === "AVL") {
          //cannot use innerhtml as it will remove button
          const innerdiv = document.createElement("div");
          innerdiv.append("Available - " + availabilty.seats);
          div.appendChild(innerdiv);
          div.style.display = "block";
          div.firstChild.onclick = () => {
            if (this.state.class !== "") {
              var cost = this.teirPrice(
                this.props.train.ticket_cost,
                this.state.class
              );
              this.props.history.push({
                pathname: "../book/",
                search: "",
                state: {
                  ...this.props.train,
                  ...this.props.route,
                  date: this.props.date,
                  teir: this.state.class,
                  cost: cost,
                  availability: availabilty
                }
              });
            } else {
              alert("select tier for train");
            }
          };
        } else {
          div.style.color = "red";
          div.innerHTML = "Not Available";
          div.style.display = "block";
        }
      });
  };
  render() {
    const train = this.props.train;
    const route = this.props.route;
    const depart_time = new Date(this.props.train.depart_time);
    const arrival_time = new Date(this.props.train.arrival_time);
    let duration = (arrival_time - depart_time) / (1000 * 60 * 60);
    let hours = duration - (duration % 1);
    let minutes = Math.round((duration % 1) * 60);
    return (
      <React.Fragment>
        <div id="train-name">
          <div style={{ fontWeight: "600", fontSize: "25px" }}>
            {train.name}
          </div>
          <div style={{ fontWeight: "bold", fontSize: "15px" }}>
            #{train.train_no}
          </div>
          <p style={{ fontWeight: "bold", fontSize: "12px" }}>
            Departs on : {train.departing_days.map(day => day + ", ")}
          </p>
        </div>
        <div>
          <h3>
            {new Date(train.depart_time).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit"
            })}
          </h3>
          <p>
            <strong>{route.src_stn.code}</strong>
          </p>
          <p style={{ fontSize: "12px", color: "gray" }}>
            {" "}
            <strong>{route.src_stn.name}</strong>{" "}
          </p>
        </div>
        <div>
          <h3>{hours + "H " + minutes + "m"}</h3>
        </div>
        <div>
          <h3>
            {new Date(train.arrival_time).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit"
            })}
          </h3>
          <p>
            <strong>{route.des_stn.code}</strong>
          </p>
          <p style={{ fontSize: "12px", color: "gray" }}>
            {" "}
            <strong>{route.des_stn.name}</strong>
          </p>
        </div>
        <button
          // done so that on button click right button loads the value
          id={"availability" + this.props.train._id}
          className="availability"
          onClick={this.bookHandler}
        >
          Check availability and price
        </button>
        <div
          id={"availability-div" + this.props.train._id}
          style={{
            padding: "20px",
            color: "green",
            fontWeight: "bold",
            display: "none",
            outline: 0
          }}
        >
          <button
            style={{
              fontWeight: "bold",
              border: "1px solid lightgray",
              outline: 0
            }}
          >
            Book Now
          </button>
          <br />
          <br />
        </div>
        <div
          id={"nearby-date-results" + this.props.train._id}
          className="nearby-date-results"
        >
          {this.props.train.available_tiers.map(tier => (
            <button key={tier} id={tier} onClick={this.classHandler}>
              {tier}
              <br />
              {this.teirPrice(train.ticket_cost, tier)}
            </button>
          ))}
        </div>
        <div className="overlay">
          <div
            className="circular-loader"
            style={{ position: "absolute", top: "45vh", left: "45vw" }}
          ></div>
          <p
            style={{
              position: "absolute",
              top: "60vh",
              left: "44vw"
            }}
          >
            <strong>Finding Trains...</strong>
          </p>
        </div>
      </React.Fragment>
    );
  }
}

export default Searchresults;
