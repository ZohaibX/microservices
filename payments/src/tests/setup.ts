//! this is a setup file for tests and script for this file is in package.json
//? sometime, there is a need to restart jest bcoz it sometimes don't detect changes in ts

import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

// telling ts that some property called signUp exists in global object
declare global {
  namespace NodeJS {
    interface Global {
      signUp(id?: string): string[];
    }
  }
}

//? initializing fake nats server
jest.mock('../services/nats/nats-wrapper');
// this method will replace a file (we provide it) with a file with same name in a mocks folders, somewhere located in a project

// bole to -- sab se pehle
let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'asdfasdf'; // must be defined because we have set this in k8s cluster before
  // but tests are gonna run in local machine
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  //Node is complaining because the TLS (SSL) certificate it's been given is self-signed (i.e. it has no parent - a depth of 0). It expects to find a certificate signed by another certificate that is installed in your OS as a trusted root.
  // Your "fix" is to disable Node from rejecting self-signed certificates by allowing ANY unauthorised certificate.
  // Your fix is insecure and shouldn't really be done at all, but is often done in development (it should never be done in production).
  // The proper solution should be to put the self-signed certificate in your trusted root store OR to get a proper certificate signed by an existing Certificate Authority (which is already trusted by your server).

  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// bole to har ek se pehle run kre gha
beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();
  // ye apne ko sab existing collections de gha

  for (let collection of collections) {
    await collection.deleteMany({}); // apne ko hr collection ka data delete krne ka ha -- hr test se pele
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

// global is  a function for whole node js so if we do anything with it -- it will affect on the whole project
// but we are using it in this file which only runs on test mode
// so it will only work on test env
global.signUp = (providedId?: string) => {
  // build a payload {email  , id}
  const id = providedId || new mongoose.Types.ObjectId().toHexString();
  const payload = { email: 'test@test', id };

  // Create a JWT
  const token = jwt.sign(payload, 'asdfasdf'); // somehow unable to use process.env.JWT_SECRET! here

  // build session object - {jwt: myJwt}
  const session = { jwt: token };

  // turn the session into JSON
  const sessionJSON = JSON.stringify(session);

  // take json and encode it in base 64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // return a cookie like an actual cookie look like
  return [`express:sess=${base64}`]; //
};
