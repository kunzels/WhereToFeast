import { connect } from 'react-redux';
import Map from './map';
import { receiveFinalChoice } from '../../actions/food_actions';

const msp = state => {
    return {
        finalChoice: state.finalChoice
    };
};



export default connect(msp, null)(Map);