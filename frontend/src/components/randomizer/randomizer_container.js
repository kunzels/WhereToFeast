import { connect } from 'react-redux';
import Randomizer from './randomizer';
import { receiveFinalChoice } from '../../actions/food_actions';

const msp = state => {
    debugger
    return {
        choice: state.finalChoice || "pizza"
    };
};

const mdp = dispatch => {
    return {
        getFinalChoice: (finalChoice) => dispatch(receiveFinalChoice(finalChoice))
    };
};

export default connect(msp, mdp)(Randomizer);