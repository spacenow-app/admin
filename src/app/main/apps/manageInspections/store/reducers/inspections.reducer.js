import * as Actions from "../actions";

const initialState = {
  data: [],
  searchValues: null
};

const inspectionsReducer = function(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_INSPECTIONS: {
      return {
        ...state,
        data: action.payload
      };
    }

    case Actions.SET_INSPECTIONS_SEARCH_VALUES: {
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

export default inspectionsReducer;
