import { getAuthToken } from './auth-session.js';
import { ClientError, GraphQLClient } from 'graphql-request';
import { getGraphQLUrl } from './config.js';
import { graphQLError } from './user-error.js';

/**
 * Creates a GraphQLClient instance configured with the leget-api
 * /graphql endpoint and JWT Authorization header from the current browser session.
 *
 * @returns {GraphQLClient}
 */
export function getGraphQLClient() {
	const token = getAuthToken();

	return new GraphQLClient(getGraphQLUrl(), {
		signal: AbortSignal.timeout(30000),
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
		if (error instanceof ClientError) throw graphQLError(error.response.status, error.response.errors);
		throw error;
	}
}
