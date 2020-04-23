import React from "react";
import "whatwg-fetch";
import openSocket from "socket.io-client";
import { withRouter } from "react-router-dom";
const socket = openSocket("http://localhost:8000");

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          messages: []
        }

        this.sendSocketIO = this.sendSocketIO.bind(this);
    }

    sendSocketIO() {
      socket.emit('send message', 'My Choice');

      const that = this;
      socket.on("new message", function (data) {
        that.setState({messages: that.state.messages.concat([data.message])});
      });
    }

    render(){
        const messages = this.state.messages.map((ele) => {
          return (
            <li>{ele}</li>
          )
        })

        return (
          <div>
            <button onClick={this.sendSocketIO}>Send Socket.io</button>
            <ul>
              {messages}
            </ul>
          </div>
        );
    }
}

export default withRouter(Home);