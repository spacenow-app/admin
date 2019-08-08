import SpacenowUtils from '@spacenow/SpacenowUtils';
import { getClientWithAuth } from "@graphql/apolloClient"
import * as usersQL from '../graphql/users';

class usersService extends SpacenowUtils.EventEmitter {

    init() {
    }

    getUsers = () => {
        return new Promise((resolve, reject) => {
            getClientWithAuth().query({
                query: usersQL.queryGetAllUsersLegacy,
            })
                .then(response => {
                    if (response.data.getAllUsersLegacy) {
                        resolve(response.data.getAllUsersLegacy)
                    }
                    else {
                        reject(response.data.error);
                    }
                });
        });
    };
}

const instance = new usersService();

export default instance;
