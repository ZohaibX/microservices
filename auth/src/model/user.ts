import mongoose from 'mongoose';
import { Password } from './../services/password-hashing';

// An interface that describes the properties
// that are required to create a new User
interface UserAttrs {
  email: string;
  password: string;
}

// An interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  // createdAt: string; i can add properties like this which are supposed to be added by mongoose
}

const userSchema = new mongoose.Schema<UserDoc, UserModel>(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  // changing the returns
  {
    toJSON: {
      transform(fullDocument, returns) {
        returns.id = returns._id; // normally , all dbs have id property instead of _id , so we will also use id in mongoose
        delete returns._id;

        delete returns.password; // password will not be returned in any request
        delete returns.__v; // we don't want to show mongoose's this property bcoz other dbs don't have this
      },
    },
  }
);

//? password hashing middleware
userSchema.pre('save', async function (done) {
  // this pre middleware will only run on saving data
  if (this.isModified('password')) {
    // this if statement will only run when password is modified ..
    // for example, if username or email is modified/changed , then this if function will not execute
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

//? this is to apply ts type checking on the attributes -- we provide while creating -- ex at (1)
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

//? --- (1)
/*
const user = User.build({
  email: '123',
  password: '123'
});

user.email;
user.createdAt; // i can access this if i add this in document interface
*/

export { User };
