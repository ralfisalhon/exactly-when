import React, { Component } from "react";
import Button from "./button";

// const mainColor = "#3fada8";
const windowWidth =
  window.innerWidth > 400
    ? 400 + (window.innerWidth * 0.85 - 400)
    : window.innerWidth;

class BestTimesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  prevTimePressed = elem => {
    alert(elem);
  };

  render() {
    const { data, canSelect } = this.props;
    return (
      <div style={styles.table}>
        <p style={{ marginBottom: 5 }}>Here's the breakdown so far:</p>
        {data.map(elem => {
          return (
            <div key={elem.day} style={styles.tableElem}>
              <p style={{ marginBottom: 5 }}>{elem.day}</p>
              {elem.times.map(elem => {
                return (
                  <span key={elem} style={styles.timeBlock}>
                    <Button
                      type={"alt"}
                      text={elem}
                      onClick={() =>
                        canSelect
                          ? this.prevTimePressed(elem)
                          : alert("Please create new user or pick existing")
                      }
                    />
                  </span>
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
  },
  table: {
    textAlign: "start",
    marginTop: 15
  },
  tableElem: {
    borderRadius: 10,
    marginBottom: 10
    // padding: 10
  },
  timeBlock: {
    marginTop: 10,
    marginRight: 5
  }
};

export default BestTimesTable;
