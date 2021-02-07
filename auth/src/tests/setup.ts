//! this is a setup file for tests and script for this file is in package.json
//? sometime, there is a need to restart jest bcoz it sometimes don't detect changes in ts

import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app'; // actual express app
import request from 'supertest';

// telling ts that some property called signUp exists in global object
declare global {
  namespace NodeJS {
    interface Global {
      signUp(): Promise<string[]>;
    }
  }
}

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
global.signUp = async () => {
  const email = 'test@test.com';
  const password = 'password';

  const response = await request(app)
    .post('/api/users/signUp')
    .send({ email, password })
    .expect(201);

  const cookie = response.get('Set-Cookie');
  return cookie;

  // we will get a cookie on all tests file easily
};
