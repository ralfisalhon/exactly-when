import React, { Component } from "react";

export default class Logo extends Component {
  render() {
    return (
      <p style={styles.credits}>
        Made by <a href="https://ralfisalhon.github.io/">@ralfisalhon</a> &{" "}
        <a href="https://github.com/mohsr">@mohsr</a>
      </p>
    );
  }
}

const styles = {
  credits: {
    fontSize: 12,
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0
  }
};
