import express, { Request, Response, NextFunction } from 'express';
import { User } from '../model/user';
import jwt from 'jsonwebtoken';

import { validateAuthInput } from '../services/validate-input';
import { BadRequestException } from '@zbtickets/common';
import { Password } from '../services/password-hashing';
const router = express.Router();

//! Postman must be used in https version

router.post(
  '/api/users/signIn',
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const error = validateAuthInput({ email, password });
    if (error) throw new Error(error);
    //? using next(error) -- error will directly go to the error handling middleware and catch the error and we can send valid responses

    const existingUser = await User.findOne({ email });
    if (!existingUser) throw new BadRequestException('Invalid Credentials');
    //? using next(error) - error will directly go to the error handling middleware and catch the error and we can send valid responses

    const passwordMatch = await Password.compare(
      existingUser.password,
      password
    );
    if (!passwordMatch) throw new BadRequestException('Invalid Credentials');
    //? using next(error) - error will directly go to the error handling middleware and catch the error and we can send valid responses

    //? Generating a JWT token
    const userJwt = jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY!
      // TS thinks that it is string or undefined -- so we are adding n if statement in index.js
      // but TS want that if statement to be in this same file -- so we use (!)
      // (!) means that we have already checked it .. it is defined
      // whenever TS assumes something to be undefined -- we can follow this rule
    );

    //? Storing the token in a cookie -- session object
    // req.session.jwt = userJwt; -- thats how we store anything on a cookie --
    // -- req.session property is made after cookie conf in index.js
    req.session = {
      jwt: userJwt,
    }; // for TS

    // now this cookie will be automatically send with this route -- as a cookie
    //? cookies will only show up on https -- so we can use https://ticketing.dev/api/users/signUp

    // we will get a long encrypted string, we will take that string to base64decode.org and decode it and then we will get our jwt

    res.status(200).send(existingUser); // user document is already editted in model
    // we should send 200 in signIn
  }
);

export default router;
