// import SpacenowUtils from '@spacenow/SpacenowUtils';
// import { getClientWithAuth } from "@graphql/apolloClient"
// import * as usersQL from '../graphql/users';

import * as mock from "./mock.json";

class listingsService {
  getListings = () => {
    return new Promise((resolve, reject) => {
      resolve({ data: mock.data });
    });
  };
}

const instance = new listingsService();

export default instance;
