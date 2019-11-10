import React, { Component } from "react";
import Logo from "../components/logo.jsx";
import Input from "../components/input.jsx";
import TextInput from "../components/textinput.jsx";
import Button from "../components/button.jsx";
import Modal from "../components/modal.jsx";
import Popup from "reactjs-popup";

const mainColor = "#3fada8";
const windowWidth =
  window.innerWidth > 400 ? 400 + (window.innerWidth * 0.85 - 400) : window.innerWidth;

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  createEvent = () => {
    alert("Create Event");
  };

  getInfo = () => {
    alert("Get Info");
  };

  render() {
    // const { type, placeholder } = this.props;
    return (
      <div>
        <Logo />
        <div style={styles.padding}>
          <TextInput type={"text"} label="Name of event" locked={false} active={false} />
        </div>
        <div style={styles.padding}>
          <TextInput type={"number"} label="How long (mins)?" locked={false} active={false} />
        </div>
        <div>
          <Button text={"Create Event"} onClick={this.createEvent} />
        </div>

        <Popup
          trigger={<Button type={"alt"} text={"exactly-what is this?"} onClick={this.getInfo} />}
          modal
          closeOnDocumentClick
        >
          <div style={{ marginTop: "10px", marginBottom: "10px" }}>
            <Modal />
          </div>
        </Popup>
        <div style={{ marginBottom: "50px" }} />
        <p style={styles.credits}>
          Made by <a href="https://ralfisalhon.github.io/">@ralfisalhon</a> &{" "}
          <a href="https://github.com/mohsr">@mohsr</a>
        </p>
      </div>
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
  },
  padding: {
    marginTop: 10
  }
};

export default LandingPage;
