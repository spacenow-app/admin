/* eslint-disable no-console */
import { gql } from "apollo-boost";

export const queryGetRules = gql`
  query getAllRules {
    getAllRules {
      id
      itemName
    }
  }
`