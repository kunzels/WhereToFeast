import React from 'react';
import "../../css/randomizer.css"

class Randomizer extends React.Component{
    constructor(props){
        super(props);

        this.state = {options: [], choice: "", finalChoice: "Food"};
        this.handleSubmitChoice = this.handleSubmitChoice.bind(this);
        this.handleSubmitOptions = this.handleSubmitOptions.bind(this);
        this.randomize = this.randomize.bind(this);
    } 

    // componentDidMount() {
    //     this.props.getFinalChoice(this.state.finalChoice);
    // }


    update(field) {
        
        return (e) =>
            this.setState({
                [field]: e.currentTarget.value,
            });
    }

    handleSubmitChoice(e) {
        
        e.preventDefault();         
        const {options} = this.state
        options.push(this.state.choice);
        this.props.getFinalChoice(options[options.length - 1]);
        if  (this.state.choice !== "") {
            this.setState({options: options});
            }

        this.setState({choice: ""})
    }

    randomize() {
        
        let { options } = this.state;
        if (options.length === 0) {
            options = ["ADD FOOD CHOICES"]
        }
        
        this.setState({ finalChoice: options[Math.floor(Math.random() * options.length)] }, () => {
          
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

    render(){
        
        const optionLis = this.state.options.map(option =>{
            return <li>{option}</li>
        })

        return(
            <div className="randomizer-container">
                <div className="randomizer-form">

                    <label > Add Choices Here
                        <br/> 
                        <input type="text" value={this.state.choice} onChange={this.update("choice")} />
                        <button onClick={this.handleSubmitChoice}> Add Choice </button>
                    </label>

                    <br/> 

                    <ul>{optionLis}</ul>


                    <button onClick={this.randomize}>Randomize</button>
                    <button onClick={this.handleSubmitOptions}> GO</button>
                    {/* <button type="submit" onClick={this.handleSubmitClear}> Clear Choices</button> */}

                    <br/> 

                    <h3> Final Choice: {this.state.finalChoice} </h3>
                     
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