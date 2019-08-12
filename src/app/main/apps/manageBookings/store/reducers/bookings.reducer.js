import * as Actions from "../actions";

const initialState = {
  data: [],
  searchText: ""
};

const bookingsReducer = function(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_BOOKINGS: {
      return {
        ...state,
        data: action.payload
      };
    }

    case Actions.SET_BOOKINGS_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.searchText
      };
    }

    default: {
      return state;
    }
  }
};

export default bookingsReducer;
