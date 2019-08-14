import * as Actions from "../actions";

const initialState = null;

const widgetsReducer = function(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_WIDGETS:
      return {
        ...action.payload
      };
    case Actions.GET_USERS: {
      return {
        ...state,
        data: action.payload.rows,
        count: action.payload.count
      };
    }
    default:
      return state;
  }
};

export default widgetsReducer;

// const usersReducer = function(state = initialState, action) {
//   switch (action.type) {
//     case Actions.GET_USERS: {
//       return {
//         ...state,
//         data: action.payload.rows,
//         count: action.payload.count
//       };
//     }
//     case Actions.SET_USER_SUCCESS: {
//       return {
//         ...state,
//         data: state.data.rows.map(item => {
//           if (item.id === action.payload.id) return action.payload;
//           return item;
//         })
//       };
//     }
//     case Actions.SET_USER_ERROR: {
//       return {
//         ...state,
//         error: action.payload
//       };
//     }
//     case Actions.SET_USERS_SEARCH_TEXT: {
//       return {
//         ...state,
//         searchText: action.searchText
//       };
//     }
//     default: {
//       return state;
//     }
//   }
// };

// export default usersReducer;
