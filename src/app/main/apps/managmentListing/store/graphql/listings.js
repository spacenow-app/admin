/* eslint-disable no-console */
import { gql } from "apollo-boost";

export const queryGetAllListingsLegacy = gql`
  query GetAllListingsLegacy {
    getAllListingsLegacy {
      id
      email
      password
      emailConfirmed
    }
  }
`;
