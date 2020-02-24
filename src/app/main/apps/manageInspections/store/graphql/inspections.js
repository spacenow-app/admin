/* eslint-disable no-console */
import { gql } from "apollo-boost";

export const queryGetAllInspections = gql`
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
`;
