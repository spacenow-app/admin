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

export const mutateDesactiveVoucher = gql`
  mutation desactiveVoucher($voucherCode: String!) {
    desactiveVoucher(voucherCode: $voucherCode) {
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
