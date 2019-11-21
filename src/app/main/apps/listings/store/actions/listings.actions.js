import listingsService from "../services/listings";

export const GET_LISTINGS = "[MANAGMENT APP] GET LISTINGS";
export const GET_EXTERNAL_USERS_BY_PROVIDER = "[MANAGMENT APP] GET EXTERNAL USERS BY PROVIDER";
export const GET_EXTERNAL_CLICKS_BY_USER = "[MANAGMENT APP] GET EXTERNAL CLICKS BY USER";
export const SET_LISTINGS_SEARCH_TEXT = "[MANAGMENT APP] SET LISTINGS SEARCH TEXT";
export const SET_EXTERNAL_LISTINGS_CLICK_BY_USER_SEARCH_TEXT = "[MANAGMENT APP] SET EXTERNAL LISTINGS SEARCH TEXT";
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

export const getUsersByProvider = () => async dispatch => {

  try {
    const response =  await listingsService.getUsersByProvider();
    dispatch({
      type: GET_EXTERNAL_USERS_BY_PROVIDER,
      payload: response
    });
  } catch ( err ) {
    console.log("ERROR ===>>> ", err)
  }

}

export const getExternalClicksByUser = (userId) => async dispatch => {

  try {
    const response =  await listingsService.getExternalClicksByUser(userId);
    dispatch({
      type: GET_EXTERNAL_CLICKS_BY_USER,
      payload: response
    });
  } catch ( err ) {
    console.log("ERROR ===>>> ", err)
  }

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