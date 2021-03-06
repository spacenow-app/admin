import * as Actions from '../actions';

const initialState = {
  count: 0,
  data: [],
  searchValues: {}
};

const listingsReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_LISTINGS: {
      return {
        ...state,
        data: action.payload.rows,
        count: action.payload.count
      };
    }
    case Actions.SET_LISTINGS_SEARCH_VALUES: {
      return {
        ...state,
        searchValues: {...state.searchValues, [action.id]: action.searchValue}
      };
    }
    case Actions.UPDATE_LISTING: {
      return {
        ...state,
        data: state.data.map((item) => {
          if (item.id === action.payload.id)
            return action.payload;
          return item;
        })
      };
    }
    default: {
      return state;
    }
  }
};

export default listingsReducer;
