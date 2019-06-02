import React, { Component, Fragment } from "react";
import socketIOClient from "socket.io-client";
import UPDATE_EVENT from "./constants";
import Votes from "./Votes";

class Viewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            endpoint: "http://localhost:3001",
            data : []
        };
    }

    componentDidMount() {
        const socket = socketIOClient(this.state.endpoint);
        socket.on(UPDATE_EVENT, (data) => {
            this.setState({
                data: data
            });
        });
    }

    render() {
        const {data} = this.state;
        return (
            <Fragment>
                <Votes players={data} />
            </Fragment>
        );
    }
}

export default Viewer;