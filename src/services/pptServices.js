const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const uploadPpt = (pptx, fileName) => {
  const decode = Buffer.from(pptx, "base64");
  const param = {
    Bucket: process.env.AWS_BUCKET,
    Key: `${fileName}.pptx`,
    ACL: "public-read",
    Body: decode,
    ContentType:
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  };

  s3.upload(param, (error) => {
    if (!error) {
      return error;
    }
    return true;
  });
};

const downloadPpt = (fileName) => {
  const param = {
    Bucket: process.env.AWS_BUCKET,
    Key: `${fileName}.pptx`,
  };

  s3.getSignedUrl("getObject", param, (error, data) => {
    if (!error) {
      return error;
    }

    const link = data.split("?")[0];
    return link; // const link는 "https://BUCKET_NAME.s3.BUCKET_REGION.amazonaws.com/{filename}.pptx" 의 형태입니다.
  });
};

module.exports = {
  uploadPpt,
  downloadPpt,
};
