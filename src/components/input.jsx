import React, { Component } from "react";

const mainColor = "#3fada8";
const windowWidth =
  window.innerWidth > 400 ? 400 + (window.innerWidth * 0.85 - 400) : window.innerWidth;

class Input extends Component {
  render() {
    const { type, placeholder } = this.props;
    return <input type={type} style={styles.textInput} placeholder={placeholder}></input>;
  }
}

const styles = {
  textInput: {
    backgroundColor: "#ecf0f1",
    borderWidth: 0,
    margin: "10px",
    padding: "10px",
    paddingLeft: "0px",
    borderBottomWidth: 1,
    borderColor: "black",
    width: windowWidth * 0.6
  }
};

export default Input;
