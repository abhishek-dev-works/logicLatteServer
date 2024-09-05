const { BackblazeB2 } = require("backblaze-b2-sdk");
const fs = require('fs');
const path = require('path');

async function uploadFileToB2(file) {
  const b2 = BackblazeB2({
    accountId: process.env.B2_APPLICATION_KEY_ID,
    masterApplicationKey: process.env.B2_APPLICATION_KEY,
  });

  // Authorize the account (optional, automatically done by SDK if not done before)
  await b2.authorizeAccount();

  // Get the upload URL and authorization token
  const { authorizationToken, uploadUrl } = await b2.getUploadUrl({
    bucketId: process.env.B2_BUCKET_ID, // Ensure you have the Bucket ID here
  });
  console.log("Upload URL:", uploadUrl);

  // Upload the file
  const response = await b2.uploadFile({
    authorizationToken,
    uploadUrl,
    fileName: file.originalname, // The name you want the file to have on B2
    fileContent: file.buffer, // The file content as a Buffer
  });

  console.log("File uploaded successfully:", response);

  return {
    fileName: response.fileName,
    fileUrl: `https://f005.backblazeb2.com/file/${process.env.B2_BUCKET_NAME}/${response.fileName}?authorizationToken=${authorizationToken}`,
  };
}

async function getFileByFileId(fileId) {
  console.log("fileId:", fileId);
  const b2 = BackblazeB2({
    accountId: process.env.B2_APPLICATION_KEY_ID,
    masterApplicationKey: process.env.B2_APPLICATION_KEY,
  });

  // Authorize the account (optional, automatically done by SDK if not done before)
  await b2
    .authorizeAccount()
    .then(() => {
      console.log("Account authorized");
    })
    .catch((err) => {
      console.log("Error authorizing account:", err);
    });

  // Download the file
  const response = await b2.downloadFileById({ fileId });
  console.log("File downloaded successfully\n", response);
  const filePath = path.join(__dirname, 'downloaded-image.jpg'); // Adjust file name and extension as needed
  fs.writeFileSync(filePath, response);
  return filePath;
}

module.exports = {
  uploadFileToB2,
  getFileByFileId,
};
