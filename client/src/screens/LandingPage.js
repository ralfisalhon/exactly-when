import React, { Component } from "react";
import Logo from "../components/logo.jsx";
import TextInput from "../components/textinput.jsx";
import Button from "../components/button.jsx";
import Modal from "../components/modal.jsx";
import Credits from "../components/credits.jsx";

import Popup from "reactjs-popup";

// const mainColor = "#3fada8";
// const windowWidth =
//   window.innerWidth > 400
//     ? 400 + (window.innerWidth * 0.85 - 400)
//     : window.innerWidth;

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      eventName: "",
      eventTime: 0,
      additionalOptions: false
    };
  }

  createEvent = onNavigate => {
    // activate to block empty fields
    if (this.state.eventName.length === 0) {
      alert("Please enter an event name");
      return;
    }

    this.setState({ loading: true });
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", () => {
      console.log(xhr.responseText);
      let obj = JSON.parse(xhr.responseText);
      this.setState({ loading: false });
      window.open("?id=" + obj.id, "_self");
    });
    xhr.open("POST", "http://exactly-when.herokuapp.com/createevent");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("event_name=" + this.state.eventName);
  };

  setEventName = value => {
    this.setState({ eventName: value });
  };

  setEventTime = value => {
    this.setState({ eventTime: value });
  };

  render() {
    const { loading, additionalOptions } = this.state;
    const { onNavigate } = this.props;
    return (
      <div>
        <div style={{ textAlign: "center" }}>
          <Logo />
        </div>
        <div style={styles.padding}>
          <TextInput
            onKeyPress={value => this.setEventName(value)}
            type={"text"}
            label="Name of event"
            locked={false}
            active={false}
          />
        </div>
        {!additionalOptions ? (
          <div style={{ textAlign: "right", marginTop: 5 }}>
            <p
              style={{ fontSize: 12, textDecoration: "underline" }}
              onClick={() => this.setState({ additionalOptions: true })}
            >
              Advanced options
            </p>
          </div>
        ) : (
          <div style={styles.padding}>
            <p>Option 1</p>
            <p>Option 2</p>
            <p>Option 3</p>
          </div>
        )}

        <div style={{ marginTop: 15 }}>
          <Button
            text={"Create Event"}
            onClick={() => this.createEvent(onNavigate)}
            disabled={this.state.makingRequest}
          />
        </div>
        <Popup
          trigger={
            <div style={{ marginTop: 10, textAlign: "center" }}>
              <Button type={"alt"} text={"exactly-what is this?"} />
            </div>
          }
          modal
          closeOnDocumentClick
        >
          <div
            style={{
              marginTop: "-10px",
              marginBottom: "-10px",
              marginLeft: "-75px",
              marginRight: "-75px",
              backgroundColor: "white",
              padding: "10px"
            }}
          >
            <Modal />
          </div>
        </Popup>
        {loading && (
          <div style={{ marginTop: "10px", textAlign: "center" }}>
            <p>Creating your event... Please wait.</p>
          </div>
        )}
        <div style={{ marginBottom: "50px" }} />

        <Credits />
      </div>
    );
  }
}

const styles = {
  padding: {
    marginTop: 10
  }
};

export default LandingPage;
