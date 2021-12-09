import Head from 'next/head';

// Components
import Orders from '../components/Orders';

export default function OrdersPage () {

  return (
    <>
      <Head>
        <title>Pedidos</title>
      </Head>

      <Orders />
    </>
  );
};
