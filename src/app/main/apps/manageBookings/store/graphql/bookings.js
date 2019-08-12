/* eslint-disable no-console */
import { gql } from "apollo-boost";

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
    }
  }
`;
