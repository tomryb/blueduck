import React, { Component } from "react";
import swal from 'sweetalert';
import List from "./List"
export default class Task extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            items: [],
            timeArr: [],
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({
            value: "",
            items: [...this.state.items, this.state.value]
        })
        swal({
            text: `${this.state.value} task is added`,
            icon: "success",
        });
    }

    componentDidUpdate() {
        if (this.props.timeToSave > 0) {
            this.state.timeArr.push(this.props.timeToSave);
            this.props.onSaveSuccess();
        }
    }

    render() {

        return (
            <>
                <div className={"report"}>
                    <div className={"task-container"}>
                        <div className={"input-wrapper"}>
                            <form className={"task-form"} onSubmit={this.handleSubmit}>
                                <label className={"header"}>Task
                                    <input className={"task-input"} required type="text" value={this.state.value} onChange={this.handleChange} maxLength="15" />
                                </label>
                                <input className={"button"} type="submit" value="Add task" />
                            </form>
                        </div>
                    </div>
                    <div className={"list-container"}>
                        <div className={"task-list-wrapper"}>
                            <div className={"name-container"}>
                                <h2>Task name</h2>
                                <List items={this.state.items} />
                            </div>
                            <div className={"time-container"}>
                                <h2>Total time (HH:MM:SS)</h2>
                                <List timeArr={this.state.timeArr} />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}