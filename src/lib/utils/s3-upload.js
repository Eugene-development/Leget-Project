import { graphqlRequest } from './graphql-client.js';

const GENERATE_UPLOAD_URL_MUTATION = `
  mutation GenerateUploadUrl($filename: String!, $mimeType: String!) {
    generateUploadUrl(filename: $filename, mimeType: $mimeType) {
      uploadUrl
      objectUrl
      expiresIn
    }
  }
`;

/**
 * Uploads a file to S3 via a pre-signed URL.
 *
 * 1. Calls the `generateUploadUrl` GraphQL mutation to obtain a pre-signed PUT URL.
 * 2. PUTs the file body directly to Yandex Object Storage using the pre-signed URL.
 * 3. Returns the final public object URL on success.
 *
 * @param {File} file - The File object to upload (from an <input type="file"> element)
 * @returns {Promise<string>} The permanent object URL for the uploaded file
 * @throws {Error} If the mutation fails or the S3 PUT request fails
 */
export async function uploadFileToS3(file) {
	// Step 1: Request a pre-signed upload URL from the API
	let mutationResult;
	try {
		mutationResult = await graphqlRequest(GENERATE_UPLOAD_URL_MUTATION, {
			filename: file.name,
			mimeType: file.type
		});
	} catch (error) {
		throw new Error(`Failed to generate upload URL: ${error.message}`);
	}

	const { uploadUrl, objectUrl } = mutationResult.generateUploadUrl;

	// Step 2: PUT the file directly to S3 using the pre-signed URL
	let response;
	try {
		response = await fetch(uploadUrl, {
			method: 'PUT',
			headers: {
				'Content-Type': file.type
			},
			body: file
		});
	} catch (error) {
		throw new Error(`S3 upload failed: ${error.message}`);
	}

	if (!response.ok) {
		throw new Error(`S3 upload failed with status ${response.status}`);
	}

	// Step 3: Return the final object URL
	return objectUrl;
}
