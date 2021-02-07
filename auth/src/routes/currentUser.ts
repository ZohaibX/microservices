import express, { Request, Response } from 'express';
import { currentUser } from '@zbtickets/common';
const router = express.Router();

router.get(
  '/api/users/currentUser',
  currentUser,
  async (req: Request, res: Response) => {
    // currentUser middleware will handle payload extraction from jwt
    res.status(200).send({ currentUser: req.currentUser || null });
  }
);

export default router;
