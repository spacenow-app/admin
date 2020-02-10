import { gql } from 'apollo-boost';

export const queryGetAllPlainListings = gql`
  query getAllPlainListings($page: Int!, $limit: Int!) {
    getAllPlainListings(page: $page, limit: $limit) {
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

export const publishListing = gql`
  mutation publishListing($listingId: Int!, $status: Boolean!) {
    publish(listingId: $listingId, status: $status) {
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
