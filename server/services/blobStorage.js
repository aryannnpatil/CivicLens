/**
 * Azure Blob Storage Upload Service
 * TODO: Member 2 — Implement with @azure/storage-blob
 *
 * Usage:
 *   const { uploadToBlob } = require('./blobStorage');
 *   const photoUrl = await uploadToBlob(fileBuffer, fileName);
 */

// const { BlobServiceClient } = require('@azure/storage-blob');
//
// const blobServiceClient = BlobServiceClient.fromConnectionString(
//   process.env.AZURE_STORAGE_CONNECTION_STRING
// );
// const containerClient = blobServiceClient.getContainerClient(
//   process.env.AZURE_STORAGE_CONTAINER_NAME || 'ticket-images'
// );
//
// async function uploadToBlob(buffer, originalName) {
//   const blobName = `${Date.now()}-${originalName}`;
//   const blockBlobClient = containerClient.getBlockBlobClient(blobName);
//   await blockBlobClient.uploadData(buffer, {
//     blobHTTPHeaders: { blobContentType: 'image/jpeg' },
//   });
//   return blockBlobClient.url;
// }
//
// module.exports = { uploadToBlob };

module.exports = {};
