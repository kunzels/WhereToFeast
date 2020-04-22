import React from "react";
import "whatwg-fetch";
import openSocket from "socket.io-client";
import { withRouter } from "react-router-dom";
const socket = openSocket("http://localhost:8000");

class Home extends React.Component{
    constructor(props){
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.sendSocketIO = this.sendSocketIO.bind(this);
    }

    sendSocketIO() {
        socket.emit('example_message', 'My Choice');
    }

    handleClick(){

    }

    render(){
        return (
          <div>
            
            <button onClick={this.sendSocketIO}>Send Socket.io</button>
          </div>
        );
    }
}

export default withRouter(Home);