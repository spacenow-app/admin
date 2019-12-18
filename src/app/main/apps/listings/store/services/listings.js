// import SpacenowUtils from '@spacenow/SpacenowUtils';
import { getClientWithAuth } from '@graphql/apolloClient';
import * as listingsQL from '../graphql/listings';

// import * as mock from "./mock.json";

class listingsService {
  getListingById = ({ id }) => {
    return new Promise((resolve, reject) => {
      getClientWithAuth()
        .query({
          query: listingsQL.queryGetListingById,
          variables: { id: parseInt(id, 10) }
        })
        .then((response) => {
          if (response.data.getListingById) {
            resolve(response.data.getListingById);
          } else {
            reject(response.data.error);
          }
        })
    });
  };

  getListings = () => {
    return new Promise((resolve, reject) => {
      getClientWithAuth()
        .query({
          query: listingsQL.queryGetAllListings
        })
        .then((response) => {
          if (response.data.getAllListings) {
            resolve(response.data.getAllListings);
          } else {
            reject(response.data.error);
          }
        });
    });
  };

  getUsersByProvider = () => {
    return new Promise((resolve, reject) => {
      getClientWithAuth()
        .query({
          query: listingsQL.queryGetUsersByProvider,
          variables: { provider: 'external' }
        })
        .then((response) => {
          if (response.data.getUsersByProvider) {
            resolve(response.data.getUsersByProvider);
          } else {
            reject(response.data.error);
          }
        });
    });
  };

  getExternalClicksByUser = (userId) => {
    return new Promise((resolve, reject) => {
      getClientWithAuth()
        .query({
          query: listingsQL.queryGetExternalClicksByUser,
          variables: { userId }
        })
        .then((response) => {
          if (response.data.getExternalClicksByUser) {
            resolve(response.data.getExternalClicksByUser);
          } else {
            reject(response.data.error);
          }
        });
    });
  };

  mutationListing = (input) => {
    return new Promise((resolve, reject) => {
      getClientWithAuth()
        .mutate({
          mutation: listingsQL.mutationListing,
          variables: input
        })
        .then((response) => {
          if (response.data.matationListing) {
            resolve(response.data.mutationListing);
          } else {
            reject(response.data.error);
          }
        });
    });
  };

}

const instance = new listingsService();

export default instance;
