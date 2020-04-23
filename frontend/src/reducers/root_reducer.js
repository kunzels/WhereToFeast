import { combineReducers } from "redux";
import session from "./session_reducer";
import errors from "./errors_reducer";
import finalChoice from "./food_reducer"

const RootReducer = combineReducers({
  errors,
  session,
  finalChoice
});

export default RootReducer;
