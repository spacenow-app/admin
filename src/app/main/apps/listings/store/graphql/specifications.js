/* eslint-disable no-console */
import { gql } from "apollo-boost";

export const queryGetSpecifications = gql`
  query getSpecifications($listSettingsParentId: Int!) {
    getAllSpecificationsByParentId(listSettingsParentId: $listSettingsParentId) {
      id
      itemName
      specData
    }
  }
`