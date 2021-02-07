import { NotFoundError } from '@zbtickets/common';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
// import { Ticket } from '../model/ticket';
const router = express.Router();

router.get('/api/orders/:id', async (req: Request, res: Response) => {
  res.send({});
});

export { router as showOneOrder };
