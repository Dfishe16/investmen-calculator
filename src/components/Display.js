import React, { Component } from "react";
import PropTypes from "prop-types";
import DisplayChild from "./DisplayChild";

var Finance = require('financejs');

  var finance = new Finance();

class Display extends Component {
  state = {
    APR: 0.05
  };

  componentDidMount() {
    this.calculateAPR();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.calculateAPR();
    }
  }

  calculateAPR = () => {
    const { amount } = this.props;

    if (1000 < amount && amount < 5000) {
      this.setState({ APR: 0.05 });
    }
    if (5000 < amount && amount < 10000) {
      this.setState({ APR: 0.1 });
    }
    if (10000 < amount && amount < 15000) {
      this.setState({ APR: 0.15 });
    }
    if (15000 < amount && amount < 20000) {
      this.setState({ APR: 0.2 });
    }
  };

  calculateMonthlyRepayment = () => {
    const { amount, years } = this.props;

 

    const decimalFormat = this.state.APR + 1;
    const totalInvested = decimalFormat * amount;


    var compoundInterest = finance.CI(decimalFormat, 6, totalInvested, years );

    return <p>${Math.round(compoundInterest)}</p>;
  };

  percentageAPR = () => {
    return <p>{this.state.APR * 100}%</p>;
  };

  render() {
    return (
      <div className="flex">
        <DisplayChild func={this.percentageAPR()} text="interest rate" />
        <DisplayChild
          func={this.calculateMonthlyRepayment()}
          text="Investment Value"
        />
      </div>
    );
  }
}

Display.propTypes = {
  years: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired
};

export default Display;
