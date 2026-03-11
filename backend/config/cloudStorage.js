/**
 * config/cloudStorage.js
 * Initialises the Azure Blob Storage client.
 * Export `containerClient` for use in services/storageService.js
 */
const { BlobServiceClient } = require('@azure/storage-blob');

const blobServiceClient = BlobServiceClient.fromConnectionString(
  process.env.AZURE_STORAGE_CONNECTION_STRING
);

const containerClient = blobServiceClient.getContainerClient(
  process.env.AZURE_CONTAINER_NAME
);

module.exports = { blobServiceClient, containerClient };
