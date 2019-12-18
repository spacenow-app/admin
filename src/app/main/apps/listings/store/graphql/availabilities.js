/* eslint-disable no-console */
import { gql } from "apollo-boost";

export const queryGetAvailabilities = gql`
  query getAvailabilitiesByListingId($listingId: Int!) {
    getAvailabilitiesByListingId(listingId: $listingId) {
      bookingDates
      exceptionDates
    }
  }
`