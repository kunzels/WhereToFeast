import {RECEIVE_FINAL_CHOICE} from '../actions/food_actions';

export default function (state = {}, action) {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_FINAL_CHOICE:
            debugger
            return action.finalChoice;
        default:
            return state;
    }
};