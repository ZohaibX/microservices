import mongoose from 'mongoose';
// import { DatabaseConnectionError } from '../errors/database-connection-error';
import { DatabaseConnectionError } from '@zbtickets/common';

export const database = async () => {
  if (!process.env.MONGO_URI) throw new Error('Mongo Uri Must Be Defined!');

  try {
    // connection string coming from auth-mongo-deployment file
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connected to the MongoDB database!!!');
  } catch (e) {
    throw new DatabaseConnectionError();
  }
};
