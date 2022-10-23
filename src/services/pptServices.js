const AWS = require("aws-sdk");
const createError = require("http-errors");

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

  await s3.upload(parameter, (error) => {
    if (error) {
      return error;
    }
    return true;
  });
};

const downloadPpt = async (fileName) => {
  const parameter = {
    Bucket: process.env.AWS_BUCKET,
    Key: `${fileName}.pptx`,
  };

  await s3.getObject(parameter, (error) => {
    if (error) {
      return createError(500);
    }
    s3.getSignedUrl("getObject", parameter, (secondError, data) => {
      if (secondError) {
        return createError(500);
      }
      const link = data.split("?")[0];
      return link;
    });

    return true;
  });
};

module.exports = {
  uploadPpt,
  downloadPpt,
};
