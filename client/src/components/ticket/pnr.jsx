import React, { Component } from "react";
class PNR extends Component {
  loadTicket = e => {
    e.preventDefault();
    const overlay = document.querySelector(".overlay");
    overlay.style.display = "block";
    const form = document.getElementById("find-ticket");
    fetch("/booking/ticket/search/", {
      method: "POST",
      body: JSON.stringify({ pnr: form[0].value }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.found === "success") {
          this.props.history.push({
            pathname: "/ticket/",
            search: "",
            state: { ...data }
          });
        } else {
          overlay.style.display = "none";
          alert("Wrong PNR");
        }
      });
  };

  render() {
    return (
      <div>
        <h1>Check PNR status</h1>
        <form onSubmit={this.loadTicket} id="find-ticket">
          <input
            type="text"
            name="pnr"
            id="pnr"
            placeholder="Enter your PNR no."
          />
          <input type="submit" value="Find Ticket" />
        </form>
        <div className="overlay">
          <div
            className="circular-loader"
            style={{ position: "absolute", top: "45vh", left: "45vw" }}
          ></div>
          <p style={{ position: "absolute", top: "60vh", left: "43vw" }}>
            Please Wait...
          </p>
        </div>
      </div>
    );
  }
}

export default PNR;
