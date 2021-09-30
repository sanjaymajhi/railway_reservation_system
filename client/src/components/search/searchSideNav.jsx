import React, { Component } from "react";
import moment from "moment";

class Searchsidenav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from_stn: "",
      to_stn: "",
      date: "",
      class: ""
    };
    this.loadStations();
  }
  loadStations = () => {
    fetch("/booking/stations/", {
      method: "GET"
    })
      .then(res => res.json())
      .then(data => {
        const select1 = document.getElementById("from_stn");
        const select2 = document.getElementById("to_stn");
        for (let i = 0; i < data.list.length; i++) {
          const option1 = document.createElement("option");
          option1.value = data.list[i]._id;
          option1.innerHTML = data.list[i].name + " - " + data.list[i].code;
          select1.appendChild(option1);
          const option2 = document.createElement("option");
          option2.value = data.list[i]._id;
          option2.innerHTML = data.list[i].name + " - " + data.list[i].code;
          select2.appendChild(option2);
        }
      });
  };

  handleChange = e => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({ [name]: value });
  };

  submit = e => {
    e.preventDefault();
    const overlay = document.querySelector(".overlay");
    overlay.style.display = "block";
    const url = "/booking/trains/";
    const payload = { ...this.state };
    fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.found === "success") {
          overlay.style.display = "none";
          this.props.history.push({
            pathname: "/search/",
            search: "",
            state: { ...data, date: this.state.date, class: this.state.class }
          });
        } else {
          overlay.style.display = "none";
          alert(data.error.msg);
        }
      });
  };

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.submit} id="side_form">
          <div>
            <select name="from_stn" id="from_stn" onChange={this.handleChange}>
              <option value="" selected="selected" disabled="disabled">
                From
              </option>
            </select>
          </div>
          <div>
            <select name="to_stn" id="to_stn" onChange={this.handleChange}>
              <option value="" disabled="disabled" selected="selected">
                To
              </option>
            </select>
          </div>
          <div>
            <input
              type="date"
              name="date"
              min={moment().format("YYYY-MM-DD")}
              max={moment(Date.now())
                .add(90, "d")
                .format("YYYY-MM-DD")}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <select name="class" onChange={this.handleChange}>
              <option value="" disabled="disabled" selected="selected">
                Classes
              </option>
              <option value="all">All Classses</option>
              <option value="1A">1A</option>
              <option value="2A">2A</option>
              <option value="3A">3A</option>
              <option value="SL">SL</option>
              <option value="CC">CC</option>
            </select>
          </div>
          <div>
            <input type="submit" value="Search Trains" />
          </div>
        </form>
        <div id="header">
          <p>Train Name</p>
          <p>Departure</p>
          <p>Travel Time</p>
          <p>Arrival</p>
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
              left: "44vw",
              color: "white"
            }}
          >
            <strong>Finding Trains...</strong>
          </p>
        </div>
      </React.Fragment>
    );
  }
}

export default Searchsidenav;
