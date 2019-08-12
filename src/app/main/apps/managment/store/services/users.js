import SpacenowUtils from '@spacenow/SpacenowUtils';
import { getClientWithAuth } from '@graphql/apolloClient';
import * as usersQL from '../graphql/users';
import UserInputClass from '../graphql/user-input.class';

class usersService extends SpacenowUtils.EventEmitter {
	init = () => {};

	getUsers = () => {
		return new Promise((resolve, reject) => {
			getClientWithAuth()
				.query({
					query: usersQL.queryGetAllUsersLegacy,
				})
				.then(response => {
					if (response.data.getAllUsersLegacy) {
						resolve(response.data.getAllUsersLegacy);
					} else {
						reject(response.data.error);
					}
				});
		});
	};

	updateUser = user => {
		const userM = new UserInputClass(user);
		return new Promise((resolve, reject) => {
			getClientWithAuth()
				.mutate({
					variables: { input: userM },
					mutation: usersQL.mutationUpdateUserLegacy,
				})
				.then(response => {
					console.log(response);
					if (response.data.mutationUpdateUserLegacy) {
						resolve(response.data.mutationUpdateUserLegacy);
					} else {
						reject(response.data.error);
					}
				});
		});
	};
}

const instance = new usersService();

export default instance;
