import { combineReducers } from 'redux';

import * as Actions from '../actions';

const initialState = {
  data: [],
  searchText: ''
};

const reducer = function(state = initialState, action) {
  switch (action.type) {
    default: {
      return state;
    }
  }
};

export default combineReducers({ reducer });
