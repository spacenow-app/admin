import { getClientWithAuth } from '@graphql/apolloClient'
import * as bookingsQL from '../graphql/bookings'

class bookingsService {
  init = () => {}

  getBookings = () => {
    return new Promise((resolve, reject) => {
      getClientWithAuth()
        .query({
          query: bookingsQL.queryGetAllBookings
        })
        .then(response => {
          if (response.data.getAllBookings) {
            resolve(response.data.getAllBookings)
          } else {
            reject(response.data.error)
          }
        })
    })
  }

  acceptBooking = bookingId => {
    console.log(bookingId)
    return new Promise((resolve, reject) => {
      getClientWithAuth()
        .mutate({
          mutation: bookingsQL.mutationAcceptBooking,
          variables: { bookingId }
        })
        .then(response => {
          if (response.data.acceptBooking) {
            resolve(response.data.acceptBooking)
          } else {
            reject(response.data.error)
          }
        })
    })
  }
}

const instance = new bookingsService()

export default instance
