import React, { Component, Fragment } from "react";
import socketIOClient from "socket.io-client";
import UPDATE_EVENT from "./constants";

class Viewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            endpoint: process.env.REACT_APP_SOCKET_URL,
            data : []
        };

        this.update = this.update.bind(this)
        this.inputChange = this.inputChange.bind(this)
    }

    componentDidMount() {
        const socket = socketIOClient(this.state.endpoint);
        socket.on(UPDATE_EVENT, (data) => {
            this.setState({
                data: data
            });
        });
    }

    update() {
        const socket = socketIOClient(this.state.endpoint);
        socket.emit(UPDATE_EVENT, this.state.data);
    }

    findKeyByName(name) {
        return this.state.data.findIndex(element => element.name === name);
    }

    inputChange(event) {
        const name = event.target.id;
        const votes = event.target.value;
        const index = this.findKeyByName(name);
        this.setState((state) => {
            const data = [...state.data];
            data[index].votes = parseInt(votes);
            return {data};
        });
    }

    render() {
        const {data} = this.state;
        if(data.length > 0) {
            return (
                <Fragment>
                    {data.map((item, key) => (
                        <Fragment key={key}>
                            <p>{item.name}</p>
                            <input id={item.name} value={item.votes} onChange={this.inputChange} type="number" />
                        </Fragment>
                    ))}
                    <button onClick={this.update}>Update</button>
                </Fragment>
            );
        } else {
            return <p>Nothing to show.</p>;
        }
    }
}

export default Viewer;