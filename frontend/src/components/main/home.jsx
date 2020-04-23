import React from "react";
import "whatwg-fetch";
import openSocket from "socket.io-client";
import { withRouter } from "react-router-dom";
// const socket = openSocket("http://localhost:8000");

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          handle: '',
          message: '',
          roomName: ''
        }

        this.socket = openSocket("http://localhost:8000/home");
        // this.socket.emit("joinRoom", "home");
        this.sendSocketIO = this.sendSocketIO.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.createRoom = this.createRoom.bind(this);
        this.joinRoom = this.joinRoom.bind(this);
    }

    sendSocketIO() {
      this.socket.emit('send message', this.state);
    }

    componentDidMount(){
      const that = this;
      this.socket.on("receive message", (data) => {
        that.receiveSocketIO(data);
      })
    }

    receiveSocketIO(data){
      const output = document.getElementById("output");
      const { handle, message } = data;
      output.innerHTML += "<p><strong>" + handle + ":" + "</strong>" + message + "</p>";
    }

    handleChange(field){
      return e => {
        this.setState({[field]: e.target.value});
      }
    }

    handleKeyPress(e){
      this.socket.emit("typing", this.state.handle);

      const feedback = document.getElementById("feedback");

      this.socket.on("typing", function (data) {
        feedback.innerHTML = "<p>" + data.handle + " is typing a message...</p>";
      });
    }

    createRoom(){
      const randString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      const roomCode = document.getElementById("room-code");
      this.setState({roomName: randString});
      roomCode.innerHTML = randString;
      this.socket.emit("createRoom", randString);
    }

    joinRoom(){
      this.socket.emit("joinRoom", this.state.roomName);
    }

    render(){

        return (
          <div className="chat">
            <div className="chat-window">
              <div id="output">
                <div id="feedback">
                </div>
              </div>
            </div>
            <input type="text" className="handle" onChange={this.handleChange('handle')} placeholder="Handle"/>
            <br/>
            <input type="text" className="message" onKeyPress={this.handleKeyPress}
              onChange={this.handleChange('message')} placeholder="Message"/>
            <br/>
            <button id="send" onClick={() => this.sendSocketIO()}>
              Send!
            </button>
            <div>
              <p>Your Room Code: </p>
              <p id="room-code"></p>
            </div>
            <br />
            <button onClick={() => this.createRoom()}>
              Create Room
            </button>
            <div>
              <p>Join Room?</p>
              <input type="text" className="roomName" onChange={this.handleChange("roomName")} />
              <br/>
              <button onClick={() => this.joinRoom()}>
                Join Room
              </button>
            </div>
          </div>
        );
    }
}

export default withRouter(Home);