import React, { Component } from "react";
import swal from 'sweetalert';
export default class Stoper extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isStoperOn: false,
            stoperStart: 0,
            totalTime: 0,
            timeToSave: 0,
        };
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
        this.saveTimer = this.saveTimer.bind(this);
    }

    startTimer = () => {
        this.setState({
            isStoperOn: true,
            totalTime: this.state.totalTime,
            stoperStart: Date.now() - this.state.totalTime
        });
        this.stoper = setInterval(() => {
            this.setState({
                totalTime: Date.now() - this.state.stoperStart
            });
        }, 10);
        this.getUp = setInterval(() => {
            this.setState({ isStoperOn: false });
            swal({
                title: "It's time to have a break",
                text: "You've been working for entire hour, take a break for 5 minutes. Set your break on Countdown timer, press Start and relax.",
                icon: "warning",
            });
            clearInterval(this.stoper);
            clearInterval(this.getUp);
        }, 3600000);
    };

    stopTimer = () => {
        this.setState({ isStoperOn: false });
        clearInterval(this.stoper);
        clearInterval(this.getUp);
    };

    resetTimer = () => {
        this.setState({
            stoperStart: 0,
            totalTime: 0,
        });
    };

    saveTimer = () => {
        this.setState({ timeToSave: this.state.totalTime })
        this.props.onSaveTime(this.state.totalTime);
        this.resetTimer();
    }

    render() {
        const { totalTime } = this.state;
        let milliseconds = ("0" + (Math.floor(totalTime / 10) % 1000)).slice(-2);
        let seconds = ("0" + (Math.floor(totalTime / 1000) % 60)).slice(-2);
        let minutes = ("0" + (Math.floor(totalTime / 60000) % 60)).slice(-2);
        let hours = ("0" + Math.floor(totalTime / 3600000)).slice(-2);

        return (
            <>
                <div className={"stoper"}>
                    <div className={"header"}>Stoper</div>
                    <div className={"stoper-display"}>{hours} : {minutes} : {seconds} : {milliseconds}</div>
                    {this.state.isStoperOn === false && this.state.totalTime === 0 && (<button onClick={this.startTimer}>Start</button>)}
                    {this.state.isStoperOn === true && (<button onClick={this.stopTimer}>Stop</button>)}
                    {this.state.isStoperOn === false && this.state.totalTime > 0 && (<button onClick={this.startTimer}>Resume</button>)}
                    {this.state.isStoperOn === false && this.state.totalTime > 0 && (<button onClick={this.resetTimer}>Reset</button>)}
                    {this.state.isStoperOn === false && this.state.totalTime > 0 &&
                        (<button onClick={this.saveTimer} style={{ marginTop: "1rem" }}>Save time</button>)}
                </div>
            </>
        );
    }
}
