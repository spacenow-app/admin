import * as Actions from '../actions';

const initialState = {
	data: [],
	error: null,
	searchText: '',
};

const usersReducer = function(state = initialState, action) {
	console.log(action.payload);
	switch (action.type) {
		case Actions.GET_USERS: {
			return {
				...state,
				data: action.payload,
			};
		}
		case Actions.SET_USER_SUCCESS: {
			return {
				...state,
				data: action.payload,
			};
		}
		case Actions.SET_USER_ERROR: {
			return {
				...state,
				error: action.payload,
			};
		}
		case Actions.SET_USERS_SEARCH_TEXT: {
			return {
				...state,
				searchText: action.searchText,
			};
		}
		default: {
			return state;
		}
	}
};

export default usersReducer;
