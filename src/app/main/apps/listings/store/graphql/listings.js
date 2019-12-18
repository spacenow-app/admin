/* eslint-disable no-console */
import { gql } from "apollo-boost";

export const queryGetListingById = gql`
  query getListingById($id: Int!, $isPublic: Boolean) {
    getListingById(id: $id, isPublic: $isPublic) {
      id
      userId
      title
      coverPhotoId
      bookingPeriod
      isPublished
      isReady
      quantity
      status
      updatedAt
      createdAt
      count
      listingData {
        listingId
        accessType
        bookingNoticeTime
        minTerm
        maxTerm
        description
        basePrice
        currency
        isAbsorvedFee
        capacity
        size
        meetingRooms
        isFurnished
        carSpace
        sizeOfVehicle
        maxEntranceHeight
        bookingType
        spaceType
        listingAmenities
        listingExceptionDates
        listingRules
        status
        link
      }
      location {
        id
        userId
        country
        address1
        address2
        buildingName
        city
        state
        zipcode
        lat
        lng
        placeId
        createdAt
        updatedAt
      }
      amenities {
        id
        listingId
        listSettingsId
        amount
        quantity
        currency
        settings
        type
        createdAt
        updatedAt
        settingsData {
          id
          typeId
          itemName
          otherItemName
          description
          maximum
          minimum
          startValue
          endValue
          step
          isEnable
          photo
          photoType
          isSpecification
          createdAt
          updatedAt
          specData
        }
      }
      rules {
        id
        listingId
        listSettingsId
        createdAt
        updatedAt
        settingsData {
          id
          typeId
          itemName
          otherItemName
          description
          maximum
          minimum
          startValue
          endValue
          step
          isEnable
          photo
          photoType
          isSpecification
          createdAt
          updatedAt
          specData
        }
      }
      settingsParent {
        id
        category {
          id
          typeId
          itemName
          otherItemName
          description
          maximum
          minimum
          startValue
          endValue
          step
          isEnable
          photo
          photoType
          isSpecification
          createdAt
          updatedAt
          specData
        }
        subcategory {
          id
          typeId
          itemName
          otherItemName
          description
          maximum
          minimum
          startValue
          endValue
          step
          isEnable
          photo
          photoType
          isSpecification
          createdAt
          updatedAt
          specData
        }
        bookingPeriod {
          id
          listSettingsParentId
          monthly
          weekly
          daily
          hourly
        }
      }
      accessDays {
        id
        listingId
        mon
        tue
        wed
        thu
        fri
        sat
        sun
        all247
        createdAt
        updatedAt
        listingAccessHours {
          id
          listingAccessDaysId
          weekday
          openHour
          closeHour
          allday
          createdAt
          updatedAt
        }
      }
      photos {
        id
        listingId
        name
        isCover
        bucket
        region
        key
        type
        createdAt
        updatedAt
      }
      user {
        id
        email
        provider
        userBanStatus
        profile {
          displayName
          picture
          firstName
          lastName
        }
      }
    }
  }
`;

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

export const mutationListing = gql`
  mutation Listing($input: LisitingInput) {
    Listing(input: $input) {
      status
    }
  }
`;

export const queryGetAllSpecifications = gql`
  query getSpecifications($listSettingsParentId: Int!) {
    getAllSpecificationsByParentId(listSettingsParentId: $listSettingsParentId) {
      id
      itemName
      specData
    }
  }
`