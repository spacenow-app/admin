import listingsService from '../services/listings';

export const GET_LISTINGS = '[MANAGMENT APP] GET LISTINGS';
export const SET_LISTINGS_SEARCH_VALUES = '[MANAGMENT APP] SET LISTINGS SEARCH FILTERS';
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

export function publishListing(listingID, status) {
  return (dispatch) =>
    listingsService
      .publishListing(listingID, status)
      .then((response) => dispatch({ type: UPDATE_LISTING, payload: response }));
}

export function setListingsSearchValues(id, searchValue) {
  return {
    type: SET_LISTINGS_SEARCH_VALUES,
    id: id,
    searchValue: searchValue
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
