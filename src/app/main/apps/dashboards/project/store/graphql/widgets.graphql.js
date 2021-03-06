/* eslint-disable no-console */
import { gql } from "apollo-boost";

export const queryTotalUsersLegacy = gql`
  query GetTotalUsersLegacy {
    getTotalUsersLegacy {
      count
      guests
      hosts
    }
  }
`;

export const queryTotalUsersLegacyByDate = gql`
  query GetTotalUsersLegacyByDate($days: Int) {
    getTotalUsersLegacyByDate(days: $days) {
      count
      guests
      hosts
    }
}
`;

export const queryTotalListings = gql`
  query GetTotalListings {
    getTotalListings {
      count
    }
}
`;

export const queryTotalListingsByDate = gql`
  query GetTotalListingsByDate($days: Int, $category: Int) {
    getTotalListingsByDate(days: $days, category: $category) {
      count {
        all
        active
        deleted
        published
      }
    }
  }
`;

export const queryTotalBookingsByDate = gql`
  query GetTotalBookingsByDate($days: Int) {
    getTotalBookingsByDate(days: $days) {
      count {
        all
        approved
        completed
        cancelled
      }
    }
  }
`;

export const queryTotalListingsByCategory = gql`
  query GetTotalListingsByCategory($category: ID) {
    getTotalListingsByCategory(category: $category) {
      count {
        all
        active
        deleted
        published
      }
    }
  }
`;

export const queryGetAllCategories = gql`
  query getCategories {
    getCategories {
      itemName
      subCategories {
        id
        subCategory {
          id
          itemName
        }
      }
    }
  }
`

export const queryGetListingsCategories = gql`
  query getListingsCategories {
    getListingsCategories {
      category
      count {
        all
        active
        deleted
        published
      }
    }
  }
`

export const queryGetListingsLocations = gql`
  query getListingsLocations {
    getLocationsCountListings {
      state
      count {
        all
        active
        deleted
        published
      }
    }
  }
`
