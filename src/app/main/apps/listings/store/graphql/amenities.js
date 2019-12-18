/* eslint-disable no-console */
import { gql } from "apollo-boost";

export const queryGetAmenities = gql`
  query getAllAmenities($subCategoryId: Int!) {
    getAllAmenitiesBySubCategoryId(subCategoryId: $subCategoryId) {
      id
      itemName
    }
  }
`