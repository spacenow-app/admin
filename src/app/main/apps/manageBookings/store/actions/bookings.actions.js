import bookingsService from "../services/bookings";

export const GET_BOOKINGS = "[MANAGMENT APP] GET BOOKINGS";
export const SET_BOOKINGS_SEARCH_TEXT =
  "[MANAGMENT APP] SET BOOKINGS SEARCH TEXT";

export function getBookings() {
  const request = bookingsService.getBookings();

  return dispatch =>
    request.then(response => {
      dispatch({
        type: GET_BOOKINGS,
        payload: response
      });
    });
}

export function setBookingsSearchText(event) {
  return {
    type: SET_BOOKINGS_SEARCH_TEXT,
    searchText: event.target.value
  };
}
