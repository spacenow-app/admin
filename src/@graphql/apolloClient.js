/* eslint-disable no-console */
import { from } from 'apollo-link';
import { InMemoryCache, ApolloClient } from 'apollo-client-preset';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';

import apisConfig from 'app/spacenow-configs/apisConfig';

const uploadLink = createUploadLink({ uri: apisConfig.graphQlHost });
const httpLink = createHttpLink({ uri: apisConfig.graphQlHost });

let apolloClientWithAuth;
const authLink = dispatch =>
	setContext((_, { headers }) => {
		const idToken = window.localStorage.getItem('jwt_access_token');
		if (!idToken || idToken.length <= 0) {
			apolloClientWithAuth = null;
			return dispatch({ type: 'FAILED' });
		}
		return {
			headers: {
				...headers,
				authorization: idToken ? `Bearer ${idToken}` : '',
			},
		};
	});

export const getClientWithAuth = dispatch => {
	if (!apolloClientWithAuth) {
		console.info(
			'Creating a new connection with Authentication to Apollo GraphQL.',
		);
		apolloClientWithAuth = new ApolloClient({
			cache: new InMemoryCache(),
			link: from([authLink(dispatch), uploadLink, httpLink]),
		});
	}
	return apolloClientWithAuth;
};

let apolloClient;
export const getClient = () => {
	if (!apolloClient) {
		console.info('Creating a new connection to Apollo GraphQL.');
		apolloClient = new ApolloClient({
			cache: new InMemoryCache(),
			link: httpLink,
		});
	}
	return apolloClient;
};
