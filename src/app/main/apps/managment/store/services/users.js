import SpacenowUtils from '@spacenow/SpacenowUtils';
import { getClientWithAuth } from '@graphql/apolloClient';

import * as QL from '../graphql/users';

import UserInputClass from '../graphql/user-input.class';

class usersService extends SpacenowUtils.EventEmitter {
  init = () => {};

  getUsers = () => {
    return new Promise((resolve, reject) => {
      getClientWithAuth()
        .query({
          query: QL.queryGetAllUsersLegacy
        })
        .then((response) => {
          if (response.data.getAllUsersLegacy) {
            resolve(response.data.getAllUsersLegacy);
          } else {
            reject(response.data.error);
          }
        });
    });
  };

  updateUser = (user) => {
    const userM = new UserInputClass(user);
    return new Promise((resolve, reject) => {
      getClientWithAuth()
        .mutate({
          mutation: QL.mutationUpdateUserLegacy,
          variables: { input: userM }
        })
        .then((response) => {
          if (response.data.updateUserLegacy) {
            resolve(response.data.updateUserLegacy);
          } else {
            reject(response.data.error);
          }
        });
    });
  };
}

const instance = new usersService();

export default instance;
