import { getClientWithAuth } from '@graphql/apolloClient';
import * as specificationsQL from '../graphql/specifications';

class specificationsService {

  getSpecifications = (id) => {
    return new Promise((resolve, reject) => {
      getClientWithAuth()
        .query({
          query: specificationsQL.queryGetSpecifications,
          variables: { listSettingsParentId: id },
        })
        .then((response) => {
          if (response.data.getAllSpecificationsByParentId) {
            resolve(response.data.getAllSpecificationsByParentId);
          } else {
            reject(response.data.error);
          }
        })
    });
  };

}

const instance = new specificationsService();

export default instance;
