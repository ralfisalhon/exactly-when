import React, { Component } from "react";
import Logo from "../components/logo.jsx";
import Button from "../components/button.jsx";
import TextInput from "../components/textinput.jsx";
import Credits from "../components/credits.jsx";

const mainColor = "#3fada8";
const windowWidth =
  window.innerWidth > 400
    ? 400 + (window.innerWidth * 0.85 - 400)
    : window.innerWidth;

class EventPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      eventName: "",
      eventTime: 0,
      name: "",
      nameCheck: false
    };
  }

  componentDidMount() {
    this.getEventInfo();
  }

  getEventInfo = () => {
    setTimeout(() => {
      this.setState({
        eventName: "ELS Meeting",
        eventTime: 90,
        loading: false
      });
    }, 1000);
  };

  checkName = () => {
    this.setState({ nameCheck: true });
  };

  setName = value => {
    this.setState({ name: value });
  };

  render() {
    const { loading, eventName, eventTime } = this.state;
    const { id } = this.props;
    return (
      <div>
        <Logo />

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div style={{ marginTop: "-20px" }}>
            <h2>{eventName}</h2>
            <div style={{ marginBottom: "20px" }}>
              {/* <p>Event Time is: {eventTime} minutes</p>
              <p>Room id is: {id}</p> */}
            </div>
            <TextInput
              onKeyPress={value => this.setName(value)}
              type={"text"}
              label="Your name"
              locked={this.state.nameCheck}
              active={false}
            />
            <Button
              type={"alt"}
              text={"Continue"}
              onClick={() => this.checkName()}
            />
          </div>
        )}
      </div>
    );
  }
}

const styles = {};

export default EventPage;
