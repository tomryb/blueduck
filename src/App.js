import React, { Component } from "react";

import Stoper from "./components/Stoper";
import Countdown from "./components/Countdown";
import Task from "./components/Task";
import Copyright from "./components/Copyright";

import "./main.css";
import logo from "./assets/logo.png"


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timeToSave: 0,
    }
    this.onSaveTime = this.onSaveTime.bind(this);
    this.onSaveSuccess = this.onSaveSuccess.bind(this);
}

  render() {
    return (
      <div className={"app"}>
        <img className={"logo"} src={logo} alt={"blueduck logo"}></img>
        <div className={"timers"}>
          <Stoper onSaveTime={this.onSaveTime} />
          <Countdown />
        </div>
        <Task timeToSave={this.state.timeToSave} onSaveSuccess={this.onSaveSuccess}></Task>
        <Copyright></Copyright>
      </div>
    );
  }

  onSaveTime(totalTime) {
    this.setState({
      timeToSave: totalTime
    })
  }

  onSaveSuccess() {
    this.setState({
      timeToSave: 0,
    });
  }
}
