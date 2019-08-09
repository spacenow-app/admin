/* eslint-disable no-console */
import { gql } from 'apollo-boost'

export const queryGetAllUsersLegacy = gql`
  query GetAllUsersLegacy {
    getAllUsersLegacy {
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
  }
`

export const mutationUpdateUserLegacy = gql`
  mutation UpdateUserLegacy($input: UserInput) {
    updateUserLegacy (
      input: $input
    ) {
      code
      success
      message
      user {
        id
        email
        emailConfirmed
        userBanStatus
        provider
      }
    }
  }
`