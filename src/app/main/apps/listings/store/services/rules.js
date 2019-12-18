import { getClientWithAuth } from '@graphql/apolloClient';
import * as rulesQL from '../graphql/rules';

class rulesService {

  getRules = () => {
    return new Promise((resolve, reject) => {
      getClientWithAuth()
        .query({
          query: rulesQL.queryGetRules
        })
        .then((response) => {
          if (response.data.getAllRules) {
            resolve(response.data.getAllRules);
          } else {
            reject(response.data.error);
          }
        })
    });
  };

}

const instance = new rulesService();

export default instance;
