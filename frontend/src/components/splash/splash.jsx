import React from 'react';
import "../../css/splash.css"
import NavBarContainer from "../nav/navbar_container"
// import { Link, Redirect } from 'react-router-dom'

class Splash extends React.Component {
    constructor(props) {
        super(props);
    }



    render() {
        return (
            <div>
                {/* <NavBarContainer /> */}
                <div className="splash-header"></div>

                <div className="splash-first">

                    <div className="confused-groups">  </div>

                    <div className="confused-text">
                        <p>Have you ever asked your friends </p>
                        <h3 className="wtf">WTF?</h3>
                        <p>We sure have. At Where to Feast,</p>
                        <p> We help you make these painful decisions</p>
                        <p>Into a fun, interactive experience!</p>
                    </div>

                    <div className="celebrate-groups">  </div>

                </div>

                <div className="splash-first">

                    <div className="splash-second-first"></div>

                    <div className="confused-text">
                        <p>Utilizing Google Maps</p>

                    </div>

                    <div className="splash-second-end"> test 3 </div>

                </div>

            </div>
        )
    }
}

export default Splash;