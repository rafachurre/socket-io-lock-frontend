import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import "./App.scss";
import { config } from "./config/config";
import { Form } from './pages'; 

class App extends Component {
  constructor() {
    super();
    this.state = {
      socket: undefined,
      lock: false,
      currentData: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    // Socket Setup
    const socket = socketIOClient(config.socket.endpoint);

    socket.on("lock", () => this.setState({ lock: true }));
    socket.on("unlock", () => this.setState({ lock: false }));
    socket.on("newData", (data) => this.setState({ currentData: data }));

    this.setState({ socket });
  }

  onSubmit(newData) {
    const { socket } = this.state;

    socket.emit("saveData", newData);
  }

  render() {
    const { lock, currentData } = this.state;
    return (
      <div className="container">
        <Form onSubmit={this.onSubmit} currentData={currentData} lock={lock}></Form>
      </div>
    );
  }
}
export default App;