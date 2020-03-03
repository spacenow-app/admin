import { combineReducers } from "redux";
import inspections from "./inspections.reducer";

const reducer = combineReducers({
  inspections
});

export default reducer;
