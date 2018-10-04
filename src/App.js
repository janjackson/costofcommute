import React, { Component } from "react";
import Inputs from "./Inputs";
import Map from "./Map";
import Results from "./Results";

class App extends Component {
  render() {
    return (
      <div>
        <div className="inputContainer">
          <div className="inner-inputContainer">
            <div className="container">
              <h1>Move house for lower costs of commute</h1>
              <Inputs/>
            </div>
          </div>
        </div>
        <Map/>
        <Results/>
      </div>
    );
  }
}

export default App;
