/* eslint-disable no-console */
import { gql } from 'apollo-boost'

export const queryGetAllBookings = gql`
  query GetAllBookings {
    getAllBookings {
      bookingId
      listingId
      totalPrice
      bookingType
      basePrice
      bookingState
      priceType
      paymentState
      guestId
      hostId
      chargeId
      checkIn
      checkOut
      createdAt
      guest {
        email
      }
      host {
        email
      }
      listing {
        title
        location {
          address1
          city
        }
      }
    }
  }
`

export const mutationAcceptBooking = gql`
  mutation acceptBooking($bookingId: String!) {
    acceptBooking(bookingId: $bookingId) {
      status
    }
  }
`
