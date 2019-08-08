import { combineReducers } from 'redux';
import users from './users.reducer';
import user from './user.reducer';

const reducer = combineReducers({
    //user,
    users,

});

export default reducer;
