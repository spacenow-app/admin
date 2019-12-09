import { gql } from 'apollo-boost';

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

export const mutationChangeListingStatus = gql`
  mutation changeListingStatus($listingId: Int!, $status: String!) {
    changeListingStatus(listingId: $listingId, status: $status) {
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
`;
