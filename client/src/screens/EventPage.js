import React, { Component } from "react";
import Logo from "../components/logo";
import Button from "../components/button";
import TextInput from "../components/textinput";
import Credits from "../components/credits";
import BestTimesTable from "../components/bestTimesTable";

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
      nameCheck: false,
      prevNames: [
        { name: "Ralfi" },
        { name: "Mohsin" },
        { name: "Daniela" }
        // { name: "Ralfi" },
        // { name: "Mohsin" },
        // { name: "Ralfi" },
        // { name: "Mohsin" },
        // { name: "Ralfi" },
        // { name: "Mohsin" }
      ],
      bestTimes: [
        { day: "Friday", date: "11/15", times: ["3pm-5pm", "9pm-11pm"] },
        { day: "Saturday", date: "11/16", times: ["2pm-3pm"] },
        {
          day: "Sunday",
          date: "11/17",
          times: ["8am-8.45am", "3pm-5pm", "9pm-11pm"]
        }
      ]
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
    }, 1000); //1000
  };

  checkName = () => {
    if (this.state.name.length < 2) {
      alert("Please enter a name!");
      return;
    }
    this.setState({ nameCheck: true });
  };

  setName = value => {
    this.setState({ name: value });
  };

  prevNamePressed = name => {
    this.setState({ name });
    this.setState({ nameCheck: true });
    // alert("Hi " + name);
  };

  render() {
    const {
      loading,
      eventName,
      eventTime,
      nameCheck,
      prevNames,
      name,
      bestTimes
    } = this.state;
    const { id } = this.props;
    return (
      <div style={{ textAlign: "center" }}>
        <Logo />

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div style={{ marginTop: "-20px" }}>
            <h2>{eventName}</h2>
            <div style={{ marginBottom: "15px" }}>
              {/* <p>Event Time is: {eventTime} minutes</p>
              <p>Room id is: {id}</p> */}
            </div>

            {!nameCheck && (
              <div>
                <div style={{ textAlign: "left" }}>
                  <h5
                    style={{
                      fontFamily: "Avenir Next",
                      color: "#202020",
                      fontWeight: "600",
                      marginBottom: 8
                    }}
                  >
                    Create new user
                    {prevNames.length > 0 ? " or pick existing" : null}:
                  </h5>
                </div>
                <TextInput
                  onKeyPress={value => this.setName(value)}
                  type={"text"}
                  label={"Your name"}
                  locked={nameCheck}
                  active={false}
                />
              </div>
            )}
            <div
              style={{
                textAlign: "start",
                width: windowWidth * 0.8,
                marginTop: 8
                // overflow: "hidden"
              }}
            >
              {!nameCheck &&
                this.state.prevNames.map(elem => {
                  return (
                    <span style={{ marginRight: 5 }}>
                      <Button
                        type={"alt"}
                        text={elem.name}
                        onClick={() => this.prevNamePressed(elem.name)}
                      />
                    </span>
                  );
                })}
            </div>
            {!nameCheck && name.length > 2 ? (
              <div style={{ marginTop: 10 }}>
                <Button
                  // type={"alt"}
                  text={"Continue"}
                  onClick={() => this.checkName()}
                />
              </div>
            ) : (
              nameCheck && (
                <div>
                  <p style={{ fontSize: 14 }}>
                    Hi {name}! Please enter your available times:
                  </p>
                </div>
              )
            )}
            <BestTimesTable data={bestTimes}></BestTimesTable>
          </div>
        )}
      </div>
    );
  }
}

const styles = {};

export default EventPage;
