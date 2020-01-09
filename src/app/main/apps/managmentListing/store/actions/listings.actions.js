import listingsService from '../services/listings';

export const GET_LISTINGS = '[MANAGMENT APP] GET LISTINGS';
export const SET_LISTINGS_SEARCH_TEXT = '[MANAGMENT APP] SET LISTINGS SEARCH TEXT';
export const UPDATE_LISTING = '[MANAGMENT APP] UPDATE LISTING';
export const OPEN_DIALOG = '[DIALOG] OPEN';
export const CLOSE_DIALOG = '[DIALOG] CLOSE';

export function getListings(page = 0, limit = 10) {
  return (dispatch) =>
    listingsService.getListings(page, limit).then((response) => {
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
  };
}

export function closeDialog() {
  return {
    type: CLOSE_DIALOG
  };
}

export function changeListingStatus(listingId, status) {
  return (dispatch) =>
    listingsService
      .changeListingStatus(listingId, status)
      .then((response) => dispatch({ type: UPDATE_LISTING, payload: response }));
}
