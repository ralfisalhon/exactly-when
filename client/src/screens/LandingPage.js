import React, { Component } from "react";
import Logo from "../components/logo.jsx";
import Input from "../components/input.jsx";
import TextInput from "../components/textinput.jsx";
import Button from "../components/button.jsx";
import Modal from "../components/modal.jsx";
import Credits from "../components/credits.jsx";

import Popup from "reactjs-popup";
import { KeyObject } from "crypto";

const mainColor = "#3fada8";
const windowWidth =
  window.innerWidth > 400
    ? 400 + (window.innerWidth * 0.85 - 400)
    : window.innerWidth;
const windowHeight = window.innerHeight;

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      eventName: "Untitled Meeting",
      eventTime: 0
    };
  }

  createEvent = onNavigate => {
    // activate to block empty fields
    // if (this.state.eventName.length == 0 || this.state.eventTime == 0) {
    //   alert("Please enter an event name & duration");
    //   return;
    // }

    // Simulates a fetch to the heroku app.
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
      onNavigate("Event");
    }, 500);
  };

  setEventName = value => {
    this.setState({ eventName: value });
  };

  setEventTime = value => {
    this.setState({ eventTime: value });
  };

  render() {
    const { loading, eventName, eventTime } = this.state;
    const { onNavigate } = this.props;
    return (
      <div style={{ textAlign: "center" }}>
        <Logo />
        <div style={styles.padding}>
          <TextInput
            onKeyPress={value => this.setEventName(value)}
            type={"text"}
            label="Name of event"
            locked={false}
            active={false}
          />
        </div>
        {/* <div style={styles.padding}>
          <TextInput
            onKeyPress={value => this.setEventTime(value)}
            type={"number"}
            label="How long (mins)?"
            locked={false}
            active={false}
          />
        </div> */}
        <div style={{ marginTop: 15 }}>
          <Button
            text={"Create Event"}
            onClick={() => this.createEvent(onNavigate)}
          />
        </div>
        <Popup
          trigger={
            <div style={{ marginTop: 10 }}>
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
          <div style={{ marginTop: "10px" }}>
            <p>Creating your event...</p>
            <p>Event name is: {eventName}</p>
            <p>Time in mins is: {eventTime}</p>
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
