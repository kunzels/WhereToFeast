import { connect } from 'react-redux';
import Map from './map';

const msp = state => {
    return {
        finalChoice: state.finalChoice
    };
};



export default connect(msp, null)(Map);