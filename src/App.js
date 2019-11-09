import React, { Component } from "react";
import "./App.css";
import LandingPage from "./screens/LandingPage";
import EventPage from "./screens/EventPage";

const mainColor = "#3fada8";
const windowWidth =
  window.innerWidth > 400 ? 400 + (window.innerWidth * 0.85 - 400) : window.innerWidth;

class App extends Component {
  constructor() {
    super();
    this.state = {
      currPage: "Event",
      pages: {
        Landing: <LandingPage />,
        Event: <EventPage />
      }
    };
  }
  render() {
    const { currPage, pages } = this.state;
    return <div className="App">{pages[currPage] || <p>Page doesn't exist</p>}</div>;
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

export default App;
