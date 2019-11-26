import React, { Component } from "react";
import Logo from "../components/logo";
import Button from "../components/button";
import TextInput from "../components/textinput";
import BestTimesTable from "../components/bestTimesTable";
import CopyID from "../components/copyid";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";

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
      error: false,
      eventTime: 0,
      name: "",
      id: this.props.id,
      nameCheck: false,
      attendees: [],
      rangeValues: [0, 3],
      bestTimes: [
        { people: 3, day: "Friday", date: "11/15", times: ["3pm", "9pm"] },
        { people: 2, day: "Saturday", date: "11/16", times: ["2pm"] },
        {
          people: 1,
          day: "Sunday",
          date: "11/17",
          times: ["8am", "3pm", "9pm"]
        }
      ]
    };
  }

  componentDidMount() {
    this.getEventInfo(this.props.id);
  }

  getEventInfo = id => {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", () => {
      console.log(xhr.responseText);
      let obj = JSON.parse(xhr.responseText);
      // window.open("?id=" + obj.id, "_self");
      // this.setState({ loading: false });
      // onNavigate("Event");
      if (!obj) {
        alert("Something went wrong");
        return;
      }
      if (obj && obj.error) {
        this.setState({ error: true });
        return;
      }
      this.setState({
        eventName: obj.event_name,
        attendees: obj.attendees,
        loading: false
      });
    });
    xhr.open("GET", "http://exactly-when.herokuapp.com/eventinfo?id=" + id);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send();
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

  renderTimePick() {
    return (
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center"
        }}
      >
        <p style={{ fontSize: 14 }}>
          Hi {this.state.name}! Please enter your available times:
        </p>
        <div
          style={{ justifyContent: "center", marginTop: 10, marginBottom: 10 }}
        >
          <Range
            step={1}
            min={0}
            max={10}
            pushable={true}
            count={1}
            defaultValue={[
              this.state.rangeValues[0],
              this.state.rangeValues[1]
            ]}
            onChange={value => this.setState({ rangeValues: value })}
            trackStyle={[{ backgroundColor: mainColor }]}
            handleStyle={[styles.handle, styles.handle]}
          />
        </div>
        <p>
          {this.state.rangeValues[0]}, {this.state.rangeValues[1]}
        </p>
      </div>
    );
  }

  render() {
    const {
      id,
      loading,
      eventName,
      nameCheck,
      attendees,
      name,
      bestTimes,
      error
    } = this.state;

    return (
      <div style={{ textAlign: "center" }}>
        <Logo />

        {loading ? (
          error ? (
            <div>
              <h3>Invalid event id :(</h3>
              <p>This event no longer exists.</p>
            </div>
          ) : (
            <p>Loading...</p>
          )
        ) : (
          <div style={{ marginTop: "-20px" }}>
            <h2>{eventName}</h2>
            <CopyID id={id} />
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
                    {attendees.length > 0 ? " or pick existing" : null}:
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
              }}
            >
              {!nameCheck &&
                this.state.attendees.map(elem => {
                  return (
                    <span key={elem.name} style={{ marginRight: 5 }}>
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
                  text={"Create new user: " + name}
                  onClick={() => this.checkName()}
                />
              </div>
            ) : (
              nameCheck && (
                <div style={{ justifyContent: "center" }}>
                  {this.renderTimePick()}
                </div>
              )
            )}
            {/* <BestTimesTable data={bestTimes} canSelect={nameCheck} /> */}
          </div>
        )}
      </div>
    );
  }
}

const styles = {
  handle: {
    backgroundColor: "white",
    borderWidth: 3,
    borderColor: mainColor,
    height: 20,
    width: 20,
    marginTop: -8
  }
};

export default EventPage;
