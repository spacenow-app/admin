import { combineReducers } from 'redux';

import * as Actions from '../actions';

const initialState = {
  data: []
};

const reducer = function(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_VOUCHERS: {
      return {
        ...state,
        data: action.payload
      };
    }
    case Actions.FAILURE_VOUCHERS: {
      return {
        ...state,
        data: null,
        error: action.error
      };
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({ reducer });
