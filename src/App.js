import React from "react";
import logo from "./logo2.svg";
import "./App.css";

function App() {
  const windowWidth = window.innerWidth;

  let styles = {
    buttonStyle: {
      backgroundColor: "#85ccdc",
      borderRadius: "20px",
      width: windowWidth * 0.85,
      marginTop: "20px"
    },
    eventText: {
      color: "white",
      fontSize: 24,
      margin: "15px",
      fontWeight: "600",
      fontFamily: "Futura"
    },
    textTitle: {
      color: "#202020",
      fontSize: 18,
      fontFamily: "Futura"
    },
    textContainer: {
      width: windowWidth * 0.7,
      marginTop: "8px"
    },
    credits: {
      fontSize: 12,
      position: "absolute",
      bottom: 10,
      left: 0,
      right: 0
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button style={styles.buttonStyle} onClick={() => alert("create event")}>
          <p style={styles.eventText}>Create Event</p>
        </button>
        <button style={styles.buttonStyle} onClick={() => alert("exactly-what?")}>
          <p style={styles.eventText}>exactly-what?</p>
        </button>
        <div style={styles.textContainer}>
          <p style={styles.textTitle}>Picking a meeting time was never easier.</p>
        </div>
        <p style={styles.credits}>Made by @ralfisalhon & @mohsinrizvi</p>
      </header>
    </div>
  );
}

export default App;
