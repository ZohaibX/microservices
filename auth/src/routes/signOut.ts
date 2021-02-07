import express, { Request, Response } from 'express';
const router = express.Router();

router.post('/api/users/signOut', async (req: Request, res: Response) => {
  req.session = null;

  res.status(200).send({});
});

export default router;
