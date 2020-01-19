import bookingsService from "../services/bookings";

export const GET_BOOKINGS = "[MANAGMENT APP] GET BOOKINGS";
export const SET_BOOKINGS_SEARCH_VALUES =
  "[MANAGMENT APP] SET BOOKINGS SEARCH FILTERS";

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

export function setBookingsSearchValues(id, searchValue) {
  return {
    type: SET_BOOKINGS_SEARCH_VALUES,
    id: id,
    searchValue: searchValue
  };
}
