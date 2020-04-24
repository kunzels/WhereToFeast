import React from 'react';
import "../../css/splash.css"
// import { Link, Redirect } from 'react-router-dom'

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.history.push("/randomizer");
  }

  render() {
    return (
      <div>
        {/* <NavBarContainer /> */}

        <div className="outer-img-container">
          <div className="splash-header"></div>
          <div className="middle">
            <button type="submit" className="randomize-button" onClick={this.handleSubmit}>Randomizer</button>
          </div>
        </div>

        <div className="splash-first">
          <div className="confused-groups"> </div>

          <div className="confused-text">
            <p>Have you ever asked your friends </p>
            <h3 className="wtf">W.T.F?</h3>
            <p>We sure have. At Where to Feast,</p>
            <p> We help you make these painful decisions</p>
            <p>Into a fun, interactive experience!</p>
            <p>Utilizing Google Maps, you and</p>
            <p>your friends can input your options</p>
            <h3 className="wtf">W.T.F</h3>
            <p>Will then randomize your options</p>
            <p>and give you a selection of restaurants</p>
            <p>to choose from within your location</p>
            <p>Sign up today! Or try the randomizer below</p>
          </div>

          <div className="celebrate-groups"> </div>
        </div>

        {/* <div className="splash-first">
          <div className="splash-second-first"></div>

          <div className="confused-text">
            <p>Utilizing Google Maps, you and</p>
            <p>your friends can input your options</p>
            <h3 className="wtf">W.T.F</h3>
            <p>Will then randomize your options</p>
            <p>and give you a selection of restaurants</p>
            <p>to choose from within your location</p>
            <p>Sign up today! Or try the randomizer below</p>
            <button type="submit" className="randomize-button" onClick={this.handleSubmit}>Randomizer</button>
          </div>

          <div className="splash-second-end"></div>
        </div> */}
      </div>
    );
  }
}

export default Splash;