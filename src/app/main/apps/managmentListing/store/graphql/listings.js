/* eslint-disable no-console */
import { gql } from "apollo-boost";

export const queryGetAllListings = gql`
  query GetAllListings {
    getAllListings {
      count
      rows {
        id
        title
        status
        user {
          email
          profile {
            firstName
            lastName
          }
        }
        location {
          city
          state
          country
        }
        isPublished
        isReady
        createdAt
      }
    }
  }
`;
