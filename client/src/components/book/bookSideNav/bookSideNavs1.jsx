import React, { Component } from "react";
class Booksidenavs1 extends Component {
  render() {
    return (
      <React.Fragment>
        <div id="ticket">
          <div>
            <div>BookYourJourney.com</div>
            <p style={{ fontWeight: "bold" }}>
              {this.props.train_name} ({this.props.train_no})
            </p>
            <p>
              {this.props.teir}, GENERAL Quota, {this.props.count} Travellers
            </p>
            <p>
              <strong>Departure </strong>
              <hr />
              <br />
              {new Date(this.props.depart_date).toLocaleDateString("en-US", {
                weekday: "long",
                day: "numeric",
                month: "short",
                year: "numeric"
              })}
            </p>
            <p>
              {" "}
              {this.props.src_stn.name} ({this.props.src_stn.code})
            </p>{" "}
            <p>
              {new Date(this.props.depart_date).toLocaleTimeString()},{" "}
              {this.props.src_stn.code}
            </p>
            <p>
              <strong>Arrival</strong>
              <hr />
              <br />
              {new Date(this.props.arrival_date).toLocaleDateString("en-US", {
                weekday: "long",
                day: "numeric",
                month: "short",
                year: "numeric"
              })}{" "}
            </p>
            <p>
              {this.props.des_stn.name} ({this.props.des_stn.code})
            </p>
            <p>
              {" "}
              {new Date(this.props.arrival_date).toLocaleTimeString()},
              {this.props.des_stn.code}
            </p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Booksidenavs1;
