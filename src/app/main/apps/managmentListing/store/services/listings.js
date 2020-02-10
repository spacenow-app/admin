import { getClientWithAuth } from '@graphql/apolloClient';
import * as QL from '../graphql/listings';

class listingsService {
  getListings = (page, limit) => {
    return new Promise((resolve, reject) => {
      getClientWithAuth()
        .query({
          query: QL.queryGetAllPlainListings,
          variables: { page, limit },
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

  publishListing = (listingId, status) => {
    return new Promise((resolve, reject) => {
      getClientWithAuth()
        .mutate({
          mutation: QL.publishListing,
          variables: { listingId, status }
        })
        .then((response) => {
          if (response.data.publish) {
            resolve(response.data.publish);
          } else {
            reject(response.data.error);
          }
        });
    });
  }

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
