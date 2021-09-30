import React, { Component } from "react";
class Bookmains1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      passengers: [],
      count: 1,
      cost: 0
    };
  }

  handleCount = async e => {
    e.preventDefault();
    const passenger1 = document.getElementById("passenger1");
    const newPassenger = passenger1.cloneNode(true);
    newPassenger.id = "passenger" + (this.state.count + 1).toString();
    newPassenger.onsubmit = this.addPassenger;
    newPassenger[0].value = "";
    newPassenger[1].value = "";
    newPassenger.firstChild.innerHTML = this.props.state.count + 1 + ".";
    const passenger = document.getElementById("passenger");
    passenger.appendChild(newPassenger);
    await this.setState({
      count: this.state.count + 1
    });
    this.props.count(this.state.count);
  };

  handleSubmit = async e => {
    e.preventDefault();
    const count = this.state.count;
    for (let i = 1; i <= count; i++) {
      let form = document.getElementById("passenger" + i.toString());
      const passenger = {
        id: form.id,
        name: form[0].value,
        age: form[1].value,
        gender: form[2].value,
        food: form[3].value
      };
      if (passenger.age >= 60) {
        const cost = this.state.cost + this.props.ticket_rate * 0.5;
        await this.setState({ cost: cost });
      } else {
        const cost = this.state.cost + this.props.ticket_rate;
        await this.setState({ cost: cost });
      }
      if (passenger.food === "V") {
        const cost = this.state.cost + 80;
        await this.setState({ cost: cost });
      } else {
        const cost = this.state.cost + 130;
        await this.setState({ cost: cost });
      }
      let passengers = this.state.passengers;
      passengers.push(passenger);
      await this.setState({ passengers: passengers });
    }
    this.props.cost(this.state.cost);
    await this.props.stageHandler(this.props.stage + 1);
    await this.props.passengersHandler({
      passengers: this.state.passengers,
      mobile: this.state.mobile
    });
  };

  render() {
    return (
      <React.Fragment>
        <div id="passenger">
          <h2>Passenger Details</h2>

          <form className="p_detail" id="passenger1">
            <div
              style={{
                textAlign: "left",
                fontWeight: "bold",
                display: "inline"
              }}
            >
              {" "}
              1.
            </div>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Full Name"
              required
            />
            <input
              type="number"
              name="age"
              id="age"
              placeholder="Age"
              required
            />
            <select name="gender" id="gender" required>
              <option value="" selected disabled>
                Gender
              </option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </select>
            <select name="food" id="food" required>
              <option value="" selected disabled>
                Food Choice
              </option>
              <option value="V">Veg</option>
              <option value="NV">Non Veg</option>
            </select>
          </form>
        </div>
        <p>Note: The ID card will be required during journey</p>
        <button onClick={this.handleCount}>+ Add passengers</button>
        <div id="email-phone">
          <div>
            <div>
              <strong>Email :{this.props.state.user.email}</strong>
            </div>
            <br />
            <p>Ticket details will be sent to this email</p>
          </div>
          <div>
            <div>
              <strong>Mobile :{this.props.state.user.mobile}</strong>
            </div>
            <p>SMS will be sent to this number</p>
          </div>
        </div>
        <p>
          <strong>Note : </strong>
          To change mobile or email, update your profile.
        </p>
        <button onClick={this.handleSubmit}>Continue</button>
      </React.Fragment>
    );
  }
}

export default Bookmains1;
