import React, { Component } from "react";
import "./App.css";
import LandingPage from "./screens/LandingPage";
import EventPage from "./screens/EventPage";
import queryString from "query-string";

const mainColor = "#3fada8";
const windowWidth =
  window.innerWidth > 400 ? 400 + (window.innerWidth * 0.85 - 400) : window.innerWidth;

class App extends Component {
  constructor() {
    super();
    this.state = {
      id: null,
      currPage: "Landing"
      // pages: {
      //   Landing: <LandingPage />,
      //   Event: <EventPage />
      // }
    };
  }

  componentDidMount() {
    const id = queryString.parse(window.location.search).id;
    if (id) {
      this.setState({ id }, () => this.setState({ currPage: "Event" }));
    }
  }

  render() {
    const { currPage, id } = this.state;
    return (
      <div className="App">
        <div style={{ maxWidth: "800px" }}>
          {currPage == "Landing" ? <LandingPage /> : <EventPage id={id} />}
        </div>
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

export default App;
