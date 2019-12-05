import { getClientWithAuth } from '@graphql/apolloClient';

import * as QL from './../graphql';

class VoucherService {
  init = () => {};

  getVouchers = () => {
    return new Promise((resolve, reject) => {
      getClientWithAuth()
        .query({
          query: QL.queryGetVouchers
        })
        .then((res) => {
          if (res.data.getVouchers) {
            resolve(res.data.getVouchers);
          } else {
            reject(res.data.error);
          }
        });
    });
  };
}

const instance = new VoucherService();

export default instance;
