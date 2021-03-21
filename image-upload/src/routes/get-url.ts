// this route will return a presigned url to the client

import { requireAuth } from '@zbtickets/common';
import express, { Request, Response } from 'express';
import AWS from 'aws-sdk';
import keys from '../../config/dev';
import { v1 as uuid } from 'uuid';

// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html

const s3 = new AWS.S3({
  signatureVersion: 'v4',
  accessKeyId: keys.ACCESS_KEY,
  secretAccessKey: keys.SECRET_KEY,
});

const router = express.Router();

// this method is returning a url, configured with the Key, we shared
router.get(
  '/api/image-upload/get-url',
  requireAuth,
  async (req: Request, res: Response) => {
    // we want our key to be like this -- myUserId/12122113.jpeg -- where filename will be used as a random unique string
    const key = `${req.currentUser!.id}/${uuid()}.jpeg`;
    // this key will be the name of the file, we will upload to s3
    // so we could save the url and this filename, into our database

    s3.getSignedUrl(
      'putObject',
      {
        Bucket: 'my-first-s3-bucket-1234567',
        ContentType: 'image/jpeg',
        Key: key,
      },
      (err, url) => res.send({ key, url, err })
    );
  }
);

export { router as GetPresignedUrl };
