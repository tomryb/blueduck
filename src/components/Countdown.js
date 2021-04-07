import React, { Component } from "react";
import swal from 'sweetalert';

export default class Countdown extends Component {

  state = {
    isCountdownOn: false,
    countdownStart: 0,
    totalTime: 0,
  };

  startTimer = () => {
    this.setState({
      isCountdownOn: true,
      totalTime: this.state.totalTime,
      countdownStart: this.state.totalTime
    });
    this.timer = setInterval(() => {
      const newTime = this.state.totalTime - 10;
      if (newTime >= 0) {
        this.setState({
          totalTime: newTime
        });
      } else {
        clearInterval(this.timer);
        this.setState({ isCountdownOn: false });
        swal({
          title: "Time's up",
          text: "It's time to work back again.",
          icon: "info",
        });
      }
    }, 10);
  };

  stopTimer = () => {
    clearInterval(this.timer);
    this.setState({ isCountdownOn: false });
  };

  resetTimer = () => {
    if (this.state.isCountdownOn === false) {
      this.setState({
        countdownStart: 0,
        totalTime: 0,
      });
    }
  };

  regulateTimer = input => {
    const { totalTime, isCountdownOn } = this.state;
    const max = 216000000;
    if (!isCountdownOn) {
      if (input === "incHours" && totalTime + 3600000 < max) {
        this.setState({ totalTime: totalTime + 3600000 });
      } else if (input === "decHours" && totalTime - 3600000 >= 0) {
        this.setState({ totalTime: totalTime - 3600000 });
      } else if (input === "incMinutes" && totalTime + 60000 < max) {
        this.setState({ totalTime: totalTime + 60000 });
      } else if (input === "decMinutes" && totalTime - 60000 >= 0) {
        this.setState({ totalTime: totalTime - 60000 });
      } else if (input === "incSeconds" && totalTime + 1000 < max) {
        this.setState({ totalTime: totalTime + 1000 });
      } else if (input === "decSeconds" && totalTime - 1000 >= 0) {
        this.setState({ totalTime: totalTime - 1000 });
      }
    }
  };

  render() {

    const { totalTime, countdownStart, isCountdownOn } = this.state;
    let seconds = ("0" + (Math.floor((totalTime / 1000) % 60) % 60)).slice(-2);
    let minutes = ("0" + Math.floor((totalTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor((totalTime / 3600000) % 60)).slice(-2);

    return (
      <div className={"countdown"}>
        <div className={"header"}>Countdown</div>
        <div className={"countdown-label"}>Hours : Minutes : Seconds</div>
        <div className={"countdown-display"}>
          <button onClick={() => this.regulateTimer("incHours")}>&#x2b;</button>
          <button onClick={() => this.regulateTimer("incMinutes")}>&#x2b;</button>
          <button onClick={() => this.regulateTimer("incSeconds")}>&#x2b;</button>
          <div className={"countdown-time"}>{hours} : {minutes} : {seconds}</div>
          <button onClick={() => this.regulateTimer("decHours")}>&#x2212;</button>
          <button onClick={() => this.regulateTimer("decMinutes")}>&#x2212;</button>
          <button onClick={() => this.regulateTimer("decSeconds")}>&#x2212;</button>
        </div>
        {isCountdownOn === false && (countdownStart === 0 || totalTime === countdownStart) && (
          <button onClick={this.startTimer}>Start</button>)}
        {isCountdownOn === true && totalTime >= 1000 && (
          <button onClick={this.stopTimer}>Stop</button>)}
        {isCountdownOn === false &&
          (countdownStart !== 0 && countdownStart !== totalTime && totalTime !== 0) && (
            <button onClick={this.startTimer}>Resume</button>)}
        {(isCountdownOn === false || totalTime < 1000) && (countdownStart !== totalTime && countdownStart > 0) && (
          <button onClick={this.resetTimer}>Reset</button>)}
      </div>
    );
  }
}