import { gql } from 'apollo-boost';

export const queryGetVouchers = gql`
  query getVouchers {
    getVouchers {
      id
      code
      type
      value
      usageCount
      usageLimit
      expireAt
      status
      createdAt
      updatedAt
    }
  }
`;
