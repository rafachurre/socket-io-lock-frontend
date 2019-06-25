import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import "./App.css"
import { config } from "./config/config"

class App extends Component {
  constructor() {
    super();
    this.state = {
      socket: undefined,
      lock: false,
      name: undefined,
      lastName: undefined,
      country: undefined
    };

    this.sendData = this.sendData.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  componentDidMount() {
    // Socket Setup
    const socket = socketIOClient(config.socket.endpoint);

    socket.on("lock", () => this.setState({ lock: true }));
    socket.on("unlock", () => this.setState({ lock: false }));
    socket.on("newData", (data) => this.setState({ name: data.name, lastName: data.lastName, country: data.country }));

    this.setState({ socket });
  }

  sendData() {
    const { socket, name, lastName, country } = this.state;
    const newData = {
      name: name,
      lastName: lastName,
      country: country
    };
    console.log(newData);

    socket.emit("saveData", newData)
  }

  onInputChange(event) {
    const input = event.currentTarget;
    this.setState({ [`${input.id}`]: input.value })
  }

  render() {
    const { lock, name, lastName, country } = this.state;
    return (
      <div className="container">
        <div className="row">
          <label htmlFor="name">Name:</label>
          <input id="name" disabled={lock} value={name} onChange={this.onInputChange} />
          {lock && <i class="material-icons">lock</i>}
        </div>
        <div className="row">
          <label htmlFor="lastName">Last Name:</label>
          <input id="lastName" disabled={lock} value={lastName} onChange={this.onInputChange} />
          {lock && <i class="material-icons">lock</i>}
        </div>
        <div className="row">
          <label htmlFor="country">Country:</label>
          <input id="country" disabled={lock} value={country} onChange={this.onInputChange} />
          {lock && <i class="material-icons">lock</i>}
        </div>
        <button onClick={this.sendData} disabled={lock}>Save</button>
      </div>
    );
  }
}
export default App;