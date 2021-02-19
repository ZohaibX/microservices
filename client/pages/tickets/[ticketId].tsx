import BuildClient from '../../api/build-client';
import { Button } from '@material-ui/core';
import useRequest from '../../hooks/use-request';
import { Alert } from '@material-ui/lab';

const ShowTicket = ({ ticket }: any) => {
  // console.log(ticket);
  const { doRequest, error } = useRequest(
    '/api/orders',
    { ticketId: ticket.id },
    'post'
  );

  const onPurchase = async () => {
    doRequest();

    // if(!error)
  };

  return (
    <div className='container'>
      <h1 className='my-5 text-center font-weight-bolder'>Get This Ticket</h1>
      <br />
      <h2>Title is: {ticket.title}</h2>
      <h4>Price: {ticket.price}</h4>
      <br />
      {error && <Alert severity='error'>{error}</Alert>}
      <br />
      <Button onClick={onPurchase} variant='contained' color='primary'>
        Purchase it
      </Button>
    </div>
  );
};

ShowTicket.getInitialProps = async (context: any) => {
  const { ticketId } = context.query; // thats how we will extract id for this page
  const client = BuildClient(context);
  const { data } = await client.get(`/api/tickets/${ticketId}`);

  return { ticket: data };
};

export default ShowTicket;
