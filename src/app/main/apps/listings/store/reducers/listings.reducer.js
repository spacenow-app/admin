import * as Actions from "../actions";

const initialState = {
  searchText: "",
  spacenow: {
    count: 0,
    data: []
  },
  external: {
    users: [],
    listings: []
  }
};

const listingsReducer = function(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_LISTINGS: {
      return {
        ...state,
        spacenow: {
          data: action.payload.rows,
          count: action.payload.count
        }
      };
    }
    case Actions.SET_LISTINGS_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.searchText
      };
    }
    case Actions.GET_EXTERNAL_USERS_BY_PROVIDER: {
      return {
        ...state,
        external: {
          users: action.payload,
          ...state.external.listings
        }
      };
    }
    case Actions.GET_EXTERNAL_CLICKS_BY_USER: {
      return {
        ...state,
        external: {
          ...state.external.users,
          listings: action.payload
        }
      };
    }
    default: {
      return state;
    }
  }
};

export default listingsReducer;
