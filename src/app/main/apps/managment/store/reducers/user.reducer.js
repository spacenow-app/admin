import * as Actions from '../actions';

const initialState = {
    data: [],
    searchText: ''
};

const usersReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_USERS:
            {
                return {
                    ...state,
                    data: action.payload
                };
            }
        case Actions.SET_USERS_SEARCH_TEXT:
            {
                return {
                    ...state,
                    searchText: action.searchText
                };
            }
        default:
            {
                return state;
            }
    }
};

export default usersReducer;





// import * as Actions from '../actions';

// const initialState = {
//     data: null
// };

// const userReducer = function (state = initialState, action) {
//     switch ( action.type )
//     {
//         case Actions.GET_USERS:
//         {
//             return {
//                 ...state,
//                 data: action.payload
//             };
//         }
//         case Actions.SAVE_USER:
//         {
//             return {
//                 ...state,
//                 data: action.payload
//             };
//         }
//         default:
//         {
//             return state;
//         }
//     }
// };

// export default userReducer;
