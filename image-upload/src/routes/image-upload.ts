import { NotFoundError } from '@zbtickets/common';
import express, { Request, Response } from 'express';

const router = express.Router();

router.post('/api/image-upload', async (req: Request, res: Response) => {
  const { imageUrl } = req.body;

  // note - imageUrl is not actual url but key -- url contains the key in itself
  // I could save this imageUrl here and i could save its data too -- all in mongo or postgres

  console.log(`ImageUrl is: ${imageUrl} `);
  res.send(`ImageUrl is: ${imageUrl} `);
});

export { router as ImageUpload };
