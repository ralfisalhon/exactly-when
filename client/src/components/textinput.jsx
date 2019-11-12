import React, { Component } from "react";
import "./textinputstyle.css";

const mainColor = "#3fada8";
const windowWidth =
  window.innerWidth > 400
    ? 400 + (window.innerWidth * 0.85 - 400)
    : window.innerWidth;

class TextInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: (props.locked && props.active) || false,
      value: props.value || "",
      error: props.error || "",
      label: props.label || "Label"
    };
  }

  changeValue = (event, onKeyPress) => {
    const value = event.target.value;
    this.setState({ value, error: "" });
    onKeyPress(value);
  };

  // handleKeyPress(event) {
  //   if (event.which === 13) {
  //     this.setState({ value: this.props.predicted });
  //   }
  // }

  render() {
    const { active, value, error, label, type } = this.state;
    const { locked, onKeyPress } = this.props;
    const fieldClassName = `field ${(locked ? active : active || value) &&
      "active"} ${locked && !active && "locked"}`;

    return (
      <div className={fieldClassName}>
        <input
          id={1}
          type={type}
          value={value}
          placeholder={active ? "" : label}
          onChange={event => this.changeValue(event, onKeyPress)}
          onKeyPress={onKeyPress}
          onFocus={() => !locked && this.setState({ active: true })}
          onBlur={() => !locked && this.setState({ active: false })}
        />
        <label htmlFor={1} className={error && "error"}>
          {error || label}
        </label>
      </div>
    );
  }
}
export default TextInput;
