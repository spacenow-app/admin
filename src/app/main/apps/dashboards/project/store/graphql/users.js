/* eslint-disable no-console */
import { gql } from "apollo-boost";

export const queryGetAllUsersLegacy = gql`
  query GetAllUsersLegacy {
    getAllUsersLegacy {
      rows {
        id
        email
        emailConfirmed
        userBanStatus
        provider
        profile {
          profileId
          firstName
          lastName
          phoneNumber
          createdAt
          picture
        }
      }
      count
    }
  }
`;

export const mutationUpdateUserLegacy = gql`
  mutation UpdateUserLegacy($input: UserInput) {
    updateUserLegacy(input: $input) {
      status
    }
  }
`;
