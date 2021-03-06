import React from 'react';
import "whatwg-fetch";
import openSocket from "socket.io-client";
import "../../css/randomizer.css"
const HOST = 
    process.env.NODE_ENV === "production"
        ? "https://where-to-feast.herokuapp.com"
        : "http://localhost:5000";

class Randomizer extends React.Component{
    constructor(props){
        super(props);

        this.socket = openSocket(HOST);
        this.state = { options: [], choice: "", finalChoice: "Food", roomName: ''};
        this.handleSubmitChoice = this.handleSubmitChoice.bind(this);
        this.handleSubmitOptions = this.handleSubmitOptions.bind(this);
        this.randomize = this.randomize.bind(this);
        this.sendSocketIO = this.sendSocketIO.bind(this);
        this.createRoom = this.createRoom.bind(this);
        this.joinRoom = this.joinRoom.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        const randString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        this.socket.emit("createRoom", randString);
        const that = this;
        this.socket.on("receive message", (data) => {
            this.receiveSocketIO(data);
        });
    } 

    componentDidMount() {
        const that = this;
        this.socket.on("receive message", (data) => {
            that.receiveSocketIO(data);
        })
    }

    sendSocketIO() {
        this.socket.emit('send message', this.state);
    }

    receiveSocketIO(data) {
        const { options, choice, finalChoice, roomName} = data;
        this.props.getFinalChoice(finalChoice);
        this.setState(data);
    }

    createRoom() {
        const randString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const roomCode = document.getElementById("room-code");
        this.setState({ roomName: randString });
        roomCode.innerHTML = randString;
        this.socket.emit("createRoom", randString);
    }

    joinRoom() {
        this.socket.emit("joinRoom", this.state.roomName);
    }

    update(field) {
        return (e) =>
            this.setState({
                [field]: e.currentTarget.value,
            });
    }

    handleSubmitChoice(e) {
        e.preventDefault();         
        // this.props.getFinalChoice(options[options.length - 1]);
        if(this.state.choice !== "") {
            const { options, choice } = this.state
            options.push(this.state.choice);
            this.setState({options: options, finalChoice: choice}, () => {
                this.sendSocketIO();
            });
        }
        this.setState({choice: ""})
    }

    randomize() {
        
        let { options } = this.state;
        if (options.length === 0) {
            options = ["ADD FOOD CHOICES"]
        }
        this.setState({ finalChoice: options[Math.floor(Math.random() * options.length)] }, () => {
            this.sendSocketIO();
            this.props.getFinalChoice(this.state.finalChoice);
        });
    }

    handleSubmitOptions(e) {
        e.preventDefault();
        const path = '/maps';
        this.props.history.push(path)
    }

    handleSubmitClear(e){
        e.preventDefault();
        this.setState({ options:[] })
    }

    handleKeyPress(e){
        if(e.key === "Enter" && this.state.choice !== ""){
            this.handleSubmitChoice(e);
            this.props.getFinalChoice(this.state.choice);
            this.sendSocketIO();
        }
    }

    render(){
        
        const optionLis = this.state.options.map(option =>{
            return <li key={Math.random()}>{option}</li>
        })

        return(
            <div className="randomizer-container">
                <div className="randomizer-form">
                    <div>
                        <label htmlFor="create-room-button">
                            <div className="create">Create a Room!</div>
                            <br/>
                            <p className="create">Your Room Code: </p>
                            <p className="create" id="room-code"></p>
                            <button className="create-button" onClick={() => this.createRoom()}>Create a Room</button>
                        </label>
                    </div>
                    <div className="join-room-container">
                        <label>
                            <div className="create">Join a Room! </div>
                            <br/>
                            <div className="create">
                                <input type="text" onChange={this.update("roomName")} />
                                <button onClick={() => this.joinRoom()}>Join Room</button>
                            </div>
                        </label>
                    </div>
                    <div>
                        <label></label>
                    </div>
                </div>
                <div className="randomizer-form">

                    <label className="add-choices-center" > Add Choices Here
                    <h3 className="final-choice-text"> Final Choice: </h3>
                    <div className="final-choice-answer">{this.state.finalChoice} </div>
                        <br/> 
                        <input className="add-choice-input" type="text" value={this.state.choice} 
                        onKeyPress={this.handleKeyPress} onChange={this.update("choice")} />
                        <button className="add-choice-button" onClick={this.handleSubmitChoice}> Add Choice </button>
                    <div className="button-center">
                        <button onClick={this.randomize}>Randomize</button>
                        <button onClick={this.handleSubmitOptions}> GO</button>
                    </div>
                    </label>

                    <br/> 

                    <ul>{optionLis}</ul>


                    {/* <button type="submit" onClick={this.handleSubmitClear}> Clear Choices</button> */}

                    <br/> 

                     
                </div>

                {/* <div className="randomize-map">
                </div> */}
                    {/* {<Map choice={this.state.finalChoice} />} */}

            </div>
        )
    }
    //test 
}

export default Randomizer; 