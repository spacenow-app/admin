import { combineReducers } from "redux";
import listings from "./listings.reducer";

const reducer = combineReducers({
  listings
});

export default reducer;
