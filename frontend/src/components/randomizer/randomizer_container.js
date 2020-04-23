import { connect } from 'react-redux';
import Randomizer from './randomizer';
import { receiveFinalChoice } from '../../actions/food_actions';

const msp = state => {
    
    return {
        choice: state.finalChoice 
    };
};

const mdp = dispatch => {
    return {
        getFinalChoice: (finalChoice) => dispatch(receiveFinalChoice(finalChoice))
    };
};

export default connect(msp, mdp)(Randomizer);