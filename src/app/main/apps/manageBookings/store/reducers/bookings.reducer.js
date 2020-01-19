import * as Actions from "../actions";

const initialState = {
  data: [],
  searchValues: null
};

const bookingsReducer = function(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_BOOKINGS: {
      return {
        ...state,
        data: action.payload
      };
    }

    case Actions.SET_BOOKINGS_SEARCH_VALUES: {
      return {
        ...state,
        searchValues: {...state.searchValues, [action.id]: action.searchValue}
      };
    }

    default: {
      return state;
    }
  }
};

export default bookingsReducer;
