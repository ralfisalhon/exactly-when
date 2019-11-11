import React, { Component } from "react";
import Logo from "../components/logo.jsx";
import TextInput from "../components/textinput.jsx";
import Credits from "../components/credits.jsx";

const mainColor = "#3fada8";
const windowWidth =
  window.innerWidth > 400 ? 400 + (window.innerWidth * 0.85 - 400) : window.innerWidth;

class EventPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      eventName: null,
      eventTime: null
    };
  }

  componentDidMount() {
    this.getEventInfo();
  }

  getEventInfo = () => {
    setTimeout(() => {
      this.setState({ eventName: "ELS Meeting", eventTime: 90, loading: false });
    }, 1000);
  };

  createEvent = () => {
    alert("Create Event");
  };

  getInfo = () => {
    alert("Get Info");
  };

  render() {
    const { loading, eventName, eventTime } = this.state;
    const { id } = this.props;
    return (
      <div
        style={{
          alignItems: "flex-start",
          justifyContent: "flex-start",
          flex: 1
        }}
      >
        <Logo />

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div style={{ marginTop: "-20px" }}>
            <h2>{eventName}</h2>
            <div style={{ marginBottom: "20px" }}>
              <p>Event Time is: {eventTime} minutes</p>
              <p>Room id is: {id}</p>
            </div>
            <TextInput
              onKeyPress={value => this.setEventTime(value)}
              type={"text"}
              label="Your name"
              locked={false}
              active={false}
            />
          </div>
        )}
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
  }
};

export default EventPage;
