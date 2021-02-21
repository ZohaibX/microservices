import BuildClient from '../../api/build-client';
import { useState, useEffect } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import useRequest from '../../hooks/use-request';
import { Alert } from '@material-ui/lab';

const OrderShow = ({ order, userData }: any) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const { doRequest, error } = useRequest(
    '/api/payments',
    { orderId: order.id },
    'post'
  );

  useEffect(() => {

    // this fn will set timeLeft variable everytime when it runs 
    const findTimeLeft = () => {
      const milliSecondsLeft =
        new Date(order.expiresAt).getTime() - new Date().getTime();
      setTimeLeft(Math.round(milliSecondsLeft / 1000));
    };

    findTimeLeft(); // this fn is to instantly invoke the timer when page is rendered -- otherwise , timer will be invoked after 1 second
    const timerId = setInterval(findTimeLeft, 1000); // will run findTimeLeft reference after every 1s

    return () => {
      clearInterval(timerId);
    }; // return is to stop the time interval whenever we navigate to some other component
  }, [order]); // useEffect will run for order , and on the start 

  if (timeLeft < 0)
    return (
      <div className='container'>
        <h1 className='text-center my-5 font-weight-bolder'>
          {order.ticket.title}
        </h1>
        <h5>Order is expired</h5>
      </div>
    );

  return (
    <div className='container'>
      <h1 className='text-center my-5 font-weight-bolder'>
        {order.ticket.title}
      </h1>
      <h5>Time to purchase the ticket: {timeLeft}</h5>
      <br />
      {/* properties we can send with it are at https://www.npmjs.com/package/react-stripe-checkout */}
      {/* test credit card number is 4242 4242 4242 4242 -- any 3 numbers for CVC and any future date  */}
      <StripeCheckout
        token={({ id }: any) => doRequest({ token: id })}
        stripeKey='pk_test_51I2F0mDc6xX8Y06lC0hddDoDuHUiZHPz5MUtJkONZfGwV4uij1KwYVF5rN77HLUv2pSFcJEVn5adtJKk7mY90Mp700EOdMDplF'
        amount={order.ticket.price * 100}
        email={userData.email}
      />
      <br />
      {error && <Alert severity='error'>{error}</Alert>}
    </div>
  );
};

export default OrderShow;

OrderShow.getInitialProps = async (context: any) => {
  const { orderId } = context.query; //!!!! thats how we will extract id for this page
  const client = BuildClient(context);
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};
