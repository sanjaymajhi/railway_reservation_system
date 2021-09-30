import React, { Component } from "react";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  };

  login_form_submit = (e) => {
    e.preventDefault();
    const overlay = document.querySelector(".overlay");
    overlay.style.display = "block";
    const url = "/user/login/";
    const payload = {
      email: this.state.email,
      password: this.state.password,
      "g-recaptcha-response": e.target[2].value,
    };

    fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.saved === "success") {
          localStorage.setItem("token", data.token);
          this.props.handleToken(data.token, data.admin);
          if (data.admin) {
            this.props.history.push("/admin/");
          } else {
            this.props.history.push("/user/profile");
          }
        } else {
          overlay.style.display = "none";
          const errors = document.getElementById("errors");
          errors.style.display = "block";
          if (data.error) {
            errors.innerHTML += data.error.msg;
          }
          if (data.errors) {
            let count = 1;
            data.errors.map((err) => {
              errors.innerHTML += "<p>" + count + ". " + err.msg + "<br/></p>";
              count++;
            });
          }
          window.location.hash = "errors";
          setTimeout(function () {
            errors.style.display = "none";
          }, 10000);
        }
      });
  };

  componentDidMount() {
    const script = document.createElement("script");

    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;

    document.body.appendChild(script);
  }

  render() {
    return (
      <div className="main">
        <form id="login_form" onSubmit={this.login_form_submit}>
          <h1>Login Form</h1>
          <label htmlFor="email">Email ID : </label>
          <input
            id="email"
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <label htmlFor="password">Password : </label>
          <input
            id="password"
            name="password"
            type="text"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <div />

          <div
            className="g-recaptcha"
            data-sitekey="6LdD4-UUAAAAAHeM_PXNeDk5X0IBFDrbl2S6sLwu"
          />
          <div />
          <input type="submit" value="Login" />
        </form>
        <div id="errors" style={{ display: "none" }}>
          <strong>Errors :</strong>{" "}
        </div>
        <div className="overlay">
          <div
            className="circular-loader"
            style={{ position: "absolute", top: "45vh", left: "45vw" }}
          ></div>
          <p style={{ position: "absolute", top: "60vh", left: "43vw" }}>
            Verifying Credentials...
          </p>
        </div>
      </div>
    );
  }
}

export default Login;
