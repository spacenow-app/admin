import * as Actions from "../actions";

const initialState = {
  data: [],
  count: 0,
  error: null,
  searchText: "",
  searchValues: null
};

const usersReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_USERS: {
      return {
        ...state,
        data: action.payload.rows,
        count: action.payload.count
      };
    }
    case Actions.SET_USER_SUCCESS: {
      return {
        ...state,
        data: state.data.map(item => {
          if (item.id === action.payload.id) return action.payload;
          return item;
        })
      };
    }
    case Actions.SET_USER_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }
    case Actions.SET_USERS_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.searchText
      };
    }

    case Actions.SET_USERS_SEARCH_VALUES: {
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

export default usersReducer;
