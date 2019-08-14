import listingsService from "../services/listings";

export const GET_LISTINGS = "[MANAGMENT APP] GET LISTINGS";
export const SET_LISTINGS_SEARCH_TEXT =
  "[MANAGMENT APP] SET LISTINGS SEARCH TEXT";

export function getListings() {
  const request = listingsService.getListings();

  return dispatch =>
    request.then(response => {
      dispatch({
        type: GET_LISTINGS,
        payload: response.data
      });
    });
}

export function setListingsSearchText(event) {
  return {
    type: SET_LISTINGS_SEARCH_TEXT,
    searchText: event.target.value
  };
}
