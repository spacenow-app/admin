import { getClientWithAuth } from '@graphql/apolloClient';
import * as availabilitiesQL from '../graphql/availabilities';

class availabilitiesService {

  getAvailabilities = (id) => {
    return new Promise((resolve, reject) => {
      getClientWithAuth()
        .query({
          query: availabilitiesQL.queryGetAvailabilities,
          variables: { listingId: id },
        })
        .then((response) => {
          if (response.data.getAvailabilitiesByListingId) {
            resolve(response.data.getAvailabilitiesByListingId);
          } else {
            reject(response.data.error);
          }
        })
    });
  };

}

const instance = new availabilitiesService();

export default instance;
