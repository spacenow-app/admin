import { getClientWithAuth } from '@graphql/apolloClient';
import * as amenitiesQL from '../graphql/amenities';

class amenitiesService {

  getAmenities = (id) => {
    return new Promise((resolve, reject) => {
      getClientWithAuth()
        .query({
          query: amenitiesQL.queryGetAmenities,
          variables: { subCategoryId: id },
        })
        .then((response) => {
          if (response.data.getAllAmenitiesBySubCategoryId) {
            resolve(response.data.getAllAmenitiesBySubCategoryId);
          } else {
            reject(response.data.error);
          }
        })
    });
  };

}

const instance = new amenitiesService();

export default instance;
