import { combineReducers } from "redux";
import bookings from "./bookings.reducer";

const reducer = combineReducers({
  bookings
});

export default reducer;
