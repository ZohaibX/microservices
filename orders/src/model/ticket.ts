import mongoose from 'mongoose';
import { Order } from './orders';
import { OrderStatus } from '@zbtickets/common';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

//! we will only include the properties , an Order needs

// An interface that describes the properties
// that are required to create a new Ticket
interface TicketAttrs {
  id: string; //! added this property , to assign same id coming from Tickets service
  title: string;
  price: number;
}

// An interface that describes the properties
// that a Ticket Model has
interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
  findByEvent(event: {
    id: string;
    version: number;
  }): Promise<TicketDoc | null>;
  // note - this property is specially for versioning stuff in the Listening service of an event
}

// An interface that describes the properties
// that a Ticket Document has
//? We are exporting it here
export interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  isReserved(): Promise<boolean>;
  version: number; // important dependency to handle versioning
  // createdAt: string; i can add properties like this which are supposed to be added by mongoose
}

const ticketSchema = new mongoose.Schema<TicketDoc, TicketModel>(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
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

ticketSchema.set('versionKey', 'version');
ticketSchema.plugin(updateIfCurrentPlugin);
// important dependency to handle versioning

// note - this property is specially for versioning stuff in the Listening service of an event
ticketSchema.statics.findByEvent = (event: { id: string; version: number }) => {
  return Ticket.findOne({
    _id: event.id,
    version: event.version - 1,
  });
};

//? this is to apply ts type checking on the attributes -- we provide while creating -- ex at (1)
ticketSchema.statics.build = (attrs: TicketAttrs) => {
  //! added this property , to assign same id coming from Tickets service
  return new Ticket({
    _id: attrs.id,
    title: attrs.title,
    price: attrs.price,
  });
};

//! new method to get reserved tickets
//* that's how i can create more methods
ticketSchema.methods.isReserved = async function () {
  const existingOrder = await Order.findOne({
    ticket: this,
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.Completed,
        OrderStatus.AwaitingPayment,
      ],
    },
  });
  return !!existingOrder; // if existingOrder is null, it will be flipped to true and then to false , vice versa
};

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);

export { Ticket };
