exports.getPhoto = (userName, size, config) => (
  `https://s3-${config.s3upload.region}.amazonaws.com/\
${config.s3upload.resizedBucket}/${config.s3upload.folder}\
resized/${size}/${userName}.jpg`
)
