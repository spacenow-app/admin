import listingsService from "../services/listings";

export const GET_LISTINGS = "[MANAGMENT APP] GET LISTINGS";
export const SET_LISTINGS_SEARCH_TEXT = "[MANAGMENT APP] SET LISTINGS SEARCH TEXT";
export const OPEN_DIALOG = '[DIALOG] OPEN';
export const CLOSE_DIALOG = '[DIALOG] CLOSE';

export function getListings() {
  const request = listingsService.getListings();

  return dispatch =>
    request.then(response => {
      dispatch({
        type: GET_LISTINGS,
        payload: response
      });
    });
}

export function setListingsSearchText(event) {
  return {
    type: SET_LISTINGS_SEARCH_TEXT,
    searchText: event.target.value
  };
}

export function openDialog(options) {
  return {
    type: OPEN_DIALOG,
    options
  }
}
export function closeDialog() {
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