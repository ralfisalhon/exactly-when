import React, { Component } from "react";

const mainColor = "#3fada8";
const windowWidth =
  window.innerWidth > 400
    ? 400 + (window.innerWidth * 0.85 - 400)
    : window.innerWidth;

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.styles = {
      buttonStyle: {
        backgroundColor: mainColor,
        borderRadius: "20px",
        width: windowWidth * 0.7,
        maxWidth: 400
        // marginTop: "20px"
      },
      eventText: {
        color: "white",
        fontSize: 22,
        margin: "12px",
        fontWeight: "600",
        fontFamily: "Futura"
      },
      infoStyle: {
        backgroundColor: "#ecf0f1",
        borderRadius: "20px",
        maxWidth: 400,
        marginBottom: "5px",
        borderWidth: 2,
        borderColor: mainColor,
        padding: "8px"
      },
      infoText: {
        color: mainColor,
        fontSize: 12,
        fontWeight: "600",
        fontFamily: "Futura"
      }
    };
  }

  render() {
    const { text, type, onClick } = this.props;

    return (
      <button
        style={type == "alt" ? this.styles.infoStyle : this.styles.buttonStyle}
        onClick={onClick}
      >
        <p style={type == "alt" ? this.styles.infoText : this.styles.eventText}>
          {text}
        </p>
      </button>
    );
  }
}
export default Button;
