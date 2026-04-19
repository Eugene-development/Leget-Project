import { GraphQLClient } from 'graphql-request';
import { getGraphQLUrl } from './config.js';

/**
 * Creates a GraphQLClient instance configured with the leget-api
 * /graphql endpoint and JWT Authorization header from localStorage.
 *
 * @returns {GraphQLClient}
 */
export function getGraphQLClient() {
	const token = localStorage.getItem('auth_token');

	return new GraphQLClient(getGraphQLUrl(), {
		headers: {
			...(token ? { Authorization: `Bearer ${token}` } : {})
		}
	});
}

/**
 * Executes a GraphQL query or mutation and returns the data.
 * Extracts meaningful error messages from GraphQL error responses.
 *
 * @param {string} query - GraphQL query or mutation string
 * @param {Record<string, unknown>} [variables] - Query variables
 * @returns {Promise<unknown>} Resolved data from the GraphQL response
 */
export async function graphqlRequest(query, variables) {
	const client = getGraphQLClient();

	try {
		const data = await client.request(query, variables);
		return data;
	} catch (error) {
		// graphql-request wraps GraphQL errors in a ClientError with a response property
		if (error.response?.errors?.length) {
			const messages = error.response.errors.map((e) => e.message);
			const gqlError = new Error(messages.join(', '));
			gqlError.graphqlErrors = error.response.errors;
			throw gqlError;
		}
		throw error;
	}
}
