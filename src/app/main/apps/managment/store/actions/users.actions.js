import usersService from '../services/users';
import * as Actions from 'app/store/actions';

export const GET_USERS = '[MANAGMENT APP] GET USERS';
export const SET_USER_SUCCESS = '[MANAGMENT APP] SET USER SUCCESS';
export const SET_USER_ERROR = '[MANAGMENT APP] SET USER ERROR';
export const SET_USERS_SEARCH_TEXT = '[MANAGMENT APP] SET USERS SEARCH TEXT';

export function getUsers() {
  const request = usersService.getUsers();

  return (dispatch) =>
    request.then((response) => {
      dispatch({
        type: GET_USERS,
        payload: response
      });
    });
}

export function updateUser(user) {
  const request = usersService.updateUser(user);
  return (dispatch) =>
    request
      .then(() => {
        dispatch(Actions.showMessage({ message: 'User updated' }));
        dispatch({
          type: SET_USER_SUCCESS,
          payload: user
        });
      })
      .catch((error) => {
        dispatch({
          type: SET_USER_ERROR,
          payload: error
        });
      });
}

export function setUsersSearchText(event) {
  return {
    type: SET_USERS_SEARCH_TEXT,
    searchText: event.target.value
  };
}
