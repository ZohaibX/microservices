//? This is gonna hold payments record
import { OrderStatus } from '@zbtickets/common';
import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

// An interface that describes the properties
// that are required to create a new Ticket
interface PaymentAttrs {
  orderId: string;
  stripeId: string;
}

// An interface that describes the properties
// that a Payment Model has
interface PaymentModel extends mongoose.Model<PaymentDoc> {
  build(attrs: PaymentAttrs): PaymentDoc;
}

// An interface that describes the properties
// that a Payment Document has
interface PaymentDoc extends mongoose.Document {
  orderId: string;
  stripeId: string;
  // createdAt: string; i can add properties like this which are supposed to be added by mongoose
}

const PaymentSchema = new mongoose.Schema<PaymentDoc, PaymentModel>(
  {
    orderId: {
      type: String,
      required: true,
    },
    stripeId: {
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
      },
    },
  }
);

//? this is to apply ts type checking on the attributes -- we provide while creating -- ex at (1)
// important - this build method is different than normal , to apply versioning
PaymentSchema.statics.build = (attrs: PaymentAttrs) => {
  return new Payment({
    attrs,
  });
};

const Payment = mongoose.model<PaymentDoc, PaymentModel>(
  'Payment',
  PaymentSchema
);

export { Payment };
