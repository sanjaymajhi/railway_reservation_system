import React, { Component } from "react";
class Bookmains3 extends Component {
  constructor(props) {
    super(props);

    this.fetchPayment();
  }

  fetchPayment = () => {
    const data = this.props.state;
    const conFee = ["1A", "2A", "3A"].indexOf(data.teir) === -1 ? 15 : 35;
    const gst = (data.cost + conFee) * 0.05;
    const totalFare = data.cost + conFee + gst;
    const user = data.user;
    const ticket = {
      train_name: data.train_name,
      train_no: data.train_no,
      teir: data.teir,
      count: data.count,
      src_stn: data.src_stn._id,
      des_stn: data.des_stn._id,
      depart_date: data.depart_date,
      arrival_date: data.arrival_date,
      passengers: data.passengers,
      cost: totalFare,
      user: user._id,
      paymentId: "",
      available_seats: data.availability.seats,
      status: data.availability.status,
    };
    var fetchPay = setInterval(async () => {
      await fetch("/extapi/invoices/" + data.paymentId, {
        method: "get",
        headers: {
          authorization:
            "Basic cnpwX3Rlc3Rfa0hiVWVmN1diTVJJQ3M6dUF1UHRRRExBbXN3aEZHb0NDYklCdWZz",
        },
      })
        .then((res) => res.json())
        .then((fetched) => {
          if (fetched.payment_id !== null) {
            ticket.paymentId = fetched.payment_id;
            fetch("/booking/ticket/", {
              method: "POST",
              body: JSON.stringify({ ...ticket }),
              headers: {
                "content-type": "application/json",
              },
            })
              .then((res) => res.json())
              .then((data) =>
                fetch("/booking/ticket/search/", {
                  method: "post",
                  body: JSON.stringify({ pnr: data.id }),
                  headers: { "content-type": "application/json" },
                })
                  .then((res) => res.json())
                  .then((data) =>
                    this.props.history.push({
                      pathname: "/ticket/",
                      search: "",
                      state: { ...data },
                    })
                  )
              );
            clearInterval(fetchPay);
          }
        });
    }, 5000);
  };

  render() {
    return (
      <React.Fragment>
        <br />
        <br />
        <strong>Please Complete your payment within 5 minutes...</strong>
        <p>Payment link has been sent to your mobile phone and email.</p>
        <p>
          Note : For demo payment select netbanking in payment page and then
          select any bank and proceed, no bank details will be asked
        </p>
        <p>
          After you have completed your payment, your seats will be confirmed
          and ticket will be available for download.
        </p>
        <br />
        <br />
        <div className="circular-loader"></div>
        <p>Waiting for Payment...</p>
      </React.Fragment>
    );
  }
}

export default Bookmains3;
