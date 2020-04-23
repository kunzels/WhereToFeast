import { connect } from 'react-redux';
import Map from './map';
import { receiveFinalChoice } from '../../actions/food_actions';

const msp = state => {
    debugger
    return {
        finalChoice: state.finalChoice
    };
};



export default connect(msp, null)(Map);