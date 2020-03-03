import { getClientWithAuth } from "@graphql/apolloClient";
import * as inspectionsQL from "../graphql/inspections";

class inspectionsService {
  init = () => {};

  getInspections = () => {
    return new Promise((resolve, reject) => {
      getClientWithAuth()
        .query({
          query: inspectionsQL.queryGetAllInspections
        })
        .then(response => {
          if (response.data.getInspections) {
            resolve(response.data.getInspections);
          } else {
            reject(response.data.error);
          }
        });
    });
  };
}

const instance = new inspectionsService();

export default instance;
