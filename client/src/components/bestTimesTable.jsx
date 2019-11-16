import React, { Component } from "react";

const mainColor = "#3fada8";
const windowWidth =
  window.innerWidth > 400
    ? 400 + (window.innerWidth * 0.85 - 400)
    : window.innerWidth;

class BestTimesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { data } = this.props;
    return (
      <div
        style={{
          textAlign: "start",
          marginTop: 15
          // overflow: "hidden"
        }}
      >
        <p style={{ marginBottom: 5 }}>Here's the breakdown so far:</p>
        {data.map(elem => {
          return (
            <div
              style={{
                marginRight: 5,
                backgroundColor: "white",
                borderRadius: 10,
                marginBottom: 10,
                padding: 10
              }}
            >
              <p>{elem.day}</p>
              {elem.times.map(elem => {
                return (
                  <div
                    style={{
                      marginLeft: 10
                    }}
                  >
                    <p>{elem}</p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
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
    width: windowWidth * 0.4,
    minWidth: "250px"
  }
};

export default BestTimesTable;
