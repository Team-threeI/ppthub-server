const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const uploadPpt = async (pptx, fileName) => {
  const decode = Buffer.from(pptx, "base64");
  const parameter = {
    Bucket: process.env.AWS_BUCKET,
    Key: `${fileName}.pptx`,
    ACL: "public-read",
    Body: decode,
    ContentType:
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  };

  try {
    await s3.upload(parameter).promise();

    return true;
  } catch (error) {
    return new Error(error);
  }
};

const downloadPpt = async (fileName) => {
  const parameter = {
    Bucket: process.env.AWS_BUCKET,
    Key: `${fileName}.pptx`,
  };

  try {
    await s3.getObject(parameter).promise();

    return s3.getSignedUrl("getObject", parameter).split("?")[0];
  } catch (error) {
    return new Error(error);
  }
};

module.exports = {
  uploadPpt,
  downloadPpt,
};
