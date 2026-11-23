import { graphqlRequest } from './graphql-client.js';
import { requestError, storageUploadError } from './user-error.js';

const GENERATE_UPLOAD_URL_MUTATION = `
  mutation GenerateUploadUrl($filename: String!, $mimeType: String!, $folder: String, $licenseId: ID) {
    generateUploadUrl(filename: $filename, mimeType: $mimeType, folder: $folder, licenseId: $licenseId) {
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
 * @param {string|null} licenseId - Optional license ID to scope the upload directory
 * @param {string|null} folder - Optional folder inside the bucket
 * @returns {Promise<string>} The permanent object URL for the uploaded file
 * @throws {Error} If the mutation fails or the S3 PUT request fails
 */
export async function uploadFileToS3(file, licenseId = null, folder = null) {
	const result = await graphqlRequest(GENERATE_UPLOAD_URL_MUTATION, {
		filename: file.name,
		mimeType: file.type,
		licenseId,
		folder
	});
	const { uploadUrl, objectUrl } = result?.generateUploadUrl ?? {};
	if (typeof uploadUrl !== 'string' || !uploadUrl || typeof objectUrl !== 'string' || !objectUrl) {
		throw requestError(502);
	}

	// Step 2: PUT the file directly to S3 using the pre-signed URL
	let response;
	try {
		response = await fetch(uploadUrl, {
			method: 'PUT',
			headers: {
				'Content-Type': file.type
			},
			body: file,
			signal: AbortSignal.timeout(180000)
		});
	} catch (error) {
		throw storageUploadError(error?.name === 'TimeoutError' ? 'timeout' : 'network');
	}

	if (!response.ok) {
		throw storageUploadError(response.status);
	}

	// Step 3: Return the final object URL
	return objectUrl;
}
