import AWS = require('aws-sdk');
import {config} from './config/config';

if (process.env.AWS_ACCESS_KEY_ID) {
  console.log('Using AWS access key and secret from environment');
  console.log('access key', process.env.AWS_ACCESS_KEY_ID);
}
else {
// Configure AWS
  AWS.config.credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
}

export const s3 = new AWS.S3({
  signatureVersion: 'v4',
  region: config.aws_region,
  params: {Bucket: config.aws_media_bucket},
});

// Generates an AWS signed URL for retrieving objects
export function getGetSignedUrl( key: string ): string {
  const signedUrlExpireSeconds = 60 * 5;

  return s3.getSignedUrl('getObject', {
    Bucket: config.aws_media_bucket,
    Key: key,
    Expires: signedUrlExpireSeconds,
  });
}

// Generates an AWS signed URL for uploading objects
export function getPutSignedUrl( key: string ): string {
  const signedUrlExpireSeconds = 60 * 5;

  return s3.getSignedUrl('putObject', {
    Bucket: config.aws_media_bucket,
    Key: key,
    Expires: signedUrlExpireSeconds,
  });
}
