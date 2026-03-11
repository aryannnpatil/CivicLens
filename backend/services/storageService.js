/**
 * services/storageService.js
 * Handles file upload to Azure Blob Storage.
 * Use with multer (memory storage) in upload routes.
 */
const { containerClient } = require('../config/cloudStorage');

/**
 * uploadFile(file)
 * @param {{ originalname: string, buffer: Buffer, mimetype: string }} file - multer file object
 * @returns {string} Public blob URL
 */
const uploadFile = async (file) => {
  // TODO: generate unique blob name, upload buffer, return public URL
  const blobName = `${Date.now()}-${file.originalname}`;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  await blockBlobClient.uploadData(file.buffer, {
    blobHTTPHeaders: { blobContentType: file.mimetype },
  });
  return blockBlobClient.url;
};

module.exports = { uploadFile };
