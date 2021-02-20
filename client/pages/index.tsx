import BuildClient from '../api/build-client';
import Link from 'next/link';
import { Button } from '@material-ui/core';
interface HomeProps {
  userData: any;
  tickets: any;
}

// i can write interface rather than using 'any'
const Home = ({ userData, tickets }: HomeProps) => {
  console.log('tickets::: ', tickets);

  return (
    <div className='container'>
      <h1 className='my-5 text-center font-weight-bolder'>Tickets</h1>
      <Link href='/tickets/new-ticket'>
        <Button variant='contained' color='secondary'>
          Create a new Ticket
        </Button>
      </Link>
      <table className='table my-5'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Get Ticket</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket: any) => (
            <tr key={ticket.id}>
              <td>{ticket.title}</td>
              <td>{ticket.price}</td>
              <td>
                <Link href='/tickets/[ticketId]' as={`tickets/${ticket.id}`}>
                  <Button
                    variant='contained'
                    color='primary'
                    href='#contained-buttons'
                  >
                    Get This
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

//! this function is executed on the server and not on the browser
// in the Next JS, page and getInitialProps only compiles single time when page "refresh" occurs so we need to fetch data at the start
Home.getInitialProps = async (context: any) => {
  //!! this function will be invoked by the method we defined in AppComponent
  //? here, context === {req , res}
  const client = BuildClient(context);
  const { data } = await client.get('/api/tickets');

  return { tickets: data };
};

export default Home;
