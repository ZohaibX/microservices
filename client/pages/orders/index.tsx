import BuildClient from '../../api/build-client';
const MyOrders = ({ orders }: any) => {
  return (
    <ul>
      {orders.map((order: any) => (
        <li key={order.id}>
          {order.ticket.title} - {order.status}
        </li>
      ))}
    </ul>
  );
};

export default MyOrders;

MyOrders.getInitialProps = async (context: any) => {
  const client = BuildClient(context);
  const { data } = await client.get(`/api/orders`);

  return { orders: data };
};
