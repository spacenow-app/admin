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

export const queryGetUsersByProvider = gql`
  query GetUsersByProvider($provider: String) {
    getUsersByProvider(provider: $provider) {
      id
      profile {
        displayName
        picture
      }
    }
  }
`;

export const queryGetExternalClicksByUser = gql`
  query GetExternalClicksByUser($userId: String!) {
    getExternalClicksByUser(userId: $userId) {
      totalClicks
      rows {
        id
        listingId
        clicks
        createdAt
        updatedAt
        listing {
          title
          photos {
            name
          }
        }
      }
    }
  }
`;
