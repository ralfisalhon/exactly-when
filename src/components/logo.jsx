import React, { Component } from "react";
import logo from "../assets/exactly-when_logo.svg";

export default class Logo extends Component {
  render() {
    return <img src={logo} className="logo" alt="logo" />;
  }
}
