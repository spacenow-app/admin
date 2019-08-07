/* eslint-disable no-console */
import { gql } from 'apollo-boost'

export const queryGetAllUsersLegacy = gql`
  query GetAllUsersLegacy {
    getAllUsersLegacy {
      id
      email
      password
      emailConfirmed
    }
  }
`