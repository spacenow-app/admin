/* eslint-disable no-console */
import { gql } from 'apollo-boost'

export const queryGetAllInspections = gql`
  query GetAllInspections {
    getInspections {
      id
      listingId
      guestId
      date
      time
      status
      message {
        messages {
          content
        }
      }
      createdAt
    }
  }
`
