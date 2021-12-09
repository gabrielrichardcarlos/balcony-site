import Head from 'next/head';

// Components
import Cart from '../components/Cart';

export default function DashboardPage () {

  return (
    <>
      <Head>
        <title>Carrinho</title>
      </Head>

      <Cart />
    </>
  );
};
