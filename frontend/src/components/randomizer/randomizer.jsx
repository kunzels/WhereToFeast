import React from 'react';
import "../../css/randomizer.css"

class Randomizer extends React.Component{
    constructor(props){
        super(props);
        this.state = {options: [], choice: "", finalChoice: ""}
        this.handleSubmitChoice = this.handleSubmitChoice.bind(this);
        this.handleSubmitOptions = this.handleSubmitOptions.bind(this);
    } 


    update(field) {
        return (e) =>
            this.setState({
                [field]: e.currentTarget.value,
            });
    }

    handleSubmitChoice(e) {
        e.preventDefault();         
        const {options} = this.state
        if(this.state.choice != ""){
            this.setState({options: options.concat([this.state.choice])});
        }
        this.setState({choice: ""})
    }

    handleSubmitOptions(e) {
        e.preventDefault();
        const {options} = this.state;
        this.setState({ finalChoice: options[Math.floor(Math.random() * options.length)] });
    }

    handleSubmitClear(e){
        e.preventDefault();
        this.setState({ options:[] })
    }

    render(){
        const optionLis = this.state.options.map(option =>{
            return <li>{option}</li>
        })

        return(
            <div className="randomizer-container">
                <form className="randomizer-form">

                    <label > Add Choices Here
                        <br/> 
                        <input type="text" value={this.state.choice} onChange={this.update("choice")} />
                        <button onClick={this.handleSubmitChoice}> Add Choice </button>
                    </label>

                    <br/> 

                    <ul>{optionLis}</ul>

                    <button type="submit" onClick={this.handleSubmitOptions}> Randomize Choices</button>
                    {/* <button type="submit" onClick={this.handleSubmitClear}> Clear Choices</button> */}

                    <br/> 

                    <h3> Final Choice: {this.state.finalChoice} </h3>
                     
                </form>
            </div>
        )
    }
    //test 
}

export default Randomizer; 