import { gql } from 'apollo-boost';

export const queryGetVouchers = gql`
  query getVouchers {
    getVouchers {
      __typename
      id
      code
      type
      value
      usageCount
      usageLimit
      expireAt
      status
    }
  }
`;

export const mutateDesactiveVoucher = gql`
  mutation desactiveVoucher($voucherCode: String!) {
    desactiveVoucher(voucherCode: $voucherCode) {
      __typename
      id
      code
    }
  }
`;

export const mutateCreateVoucher = gql`
  mutation createVoucher(
    $type: String!
    $value: Float!
    $usageLimit: Int!
    $expireAt: String!
  ) {
    createVoucher(
      type: $type
      value: $value
      usageLimit: $usageLimit
      expireAt: $expireAt
    ) {
      __typename
      id
      code
    }
  }
`;
