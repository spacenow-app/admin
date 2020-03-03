import bookingsService from '../services/bookings'

export const GET_BOOKINGS = '[MANAGMENT APP] GET BOOKINGS'
export const ACCEPT_BOOKING = '[MANAGMENT APP] ACCEPT BOOKING'
export const SET_BOOKINGS_SEARCH_VALUES = '[MANAGMENT APP] SET BOOKINGS SEARCH FILTERS'

export function getBookings() {
  const request = bookingsService.getBookings()

  return dispatch =>
    request.then(response => {
      dispatch({
        type: GET_BOOKINGS,
        payload: response
      })
    })
}

export function acceptBooking(bookingId) {
  console.log(bookingId)
  const request = bookingsService.acceptBooking(bookingId)

  return dispatch =>
    request.then(response => {
      dispatch({
        type: ACCEPT_BOOKING,
        payload: response
      })
    })
}

export function setBookingsSearchValues(id, searchValue) {
  return {
    type: SET_BOOKINGS_SEARCH_VALUES,
    id: id,
    searchValue: searchValue
  }
}
