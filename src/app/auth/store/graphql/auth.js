/* eslint-disable no-console */
import { gql } from 'apollo-boost'

export const mutationLoginAdmin = gql`
  mutation loginAdmin($email: String!, $password: String!) {
    loginAdmin(email: $email, password: $password) {
      token
      expiresIn
    }
  }
`

export const mutationTokenAdminValidate = gql`
  mutation tokenAdminValidate($token: String!) {
    tokenAdminValidate(token: $token) {
      status
      admin {
        email
        role
      }
    }
  }
`