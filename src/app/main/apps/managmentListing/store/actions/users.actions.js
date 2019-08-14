import usersService from '../services/users'

export const GET_USERS = '[MANAGMENT APP] GET USERS';
export const SET_USERS_SEARCH_TEXT = '[MANAGMENT APP] SET USERS SEARCH TEXT';
export const OPEN_DIALOG = '[DIALOG] OPEN';
export const CLOSE_DIALOG = '[DIALOG] CLOSE';
export const SET_USER_SUCCESS = "[MANAGMENT APP] SET USER SUCCESS";
export const SET_USER_ERROR = "[MANAGMENT APP] SET USER ERROR";

export function getUsers() {

    const request = usersService.getUsers();

    return (dispatch) =>
        request.then((response) => {
            dispatch({
                type: GET_USERS,
                payload: response
            })
        });
}

export function setUsersSearchText(event) {
    return {
        type: SET_USERS_SEARCH_TEXT,
        searchText: event.target.value
    }
}


export function openDialog(options)
{
    return {
        type: OPEN_DIALOG,
        options
    }
}
export function closeDialog()
{
    return {
        type: CLOSE_DIALOG
    }
}

export function updateUser(user) {
    // const request = usersService.updateUser(user);
    // return dispatch =>
    //   request
    //     .then(() => {
    //      // dispatch(showMessage({ message: "User updated" }));
    //       dispatch({
    //         type: SET_USER_SUCCESS,
    //         payload: user
    //       });
    //     })
    //     .catch(error => {
    //       dispatch({
    //         type: SET_USER_ERROR,
    //         payload: error
    //       });
    //     });
    console.log("delete teste")
  }