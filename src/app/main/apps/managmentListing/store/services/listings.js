import { getClientWithAuth } from '@graphql/apolloClient';
import * as QL from '../graphql/listings';

class listingsService {
  getListings = () => {
    return new Promise((resolve, reject) => {
      getClientWithAuth()
        .query({
          query: QL.queryGetAllPlainListings,
          fetchPolicy: 'network-only'
        })
        .then((response) => {
          if (response.data.getAllPlainListings) {
            resolve(response.data.getAllPlainListings);
          } else {
            reject(response.data.error);
          }
        });
    });
  };

  changeListingStatus = (listingId, status) => {
    return new Promise((resolve, reject) => {
      getClientWithAuth()
        .mutate({
          mutation: QL.mutationChangeListingStatus,
          variables: { listingId, status }
        })
        .then((response) => {
          if (response.data.changeListingStatus) {
            resolve(response.data.changeListingStatus);
          } else {
            reject(response.data.error);
          }
        });
    });
  };
}

export default new listingsService();
