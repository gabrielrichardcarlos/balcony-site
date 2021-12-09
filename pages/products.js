import Head from 'next/head';

// Components
import Products from '../components/Products';

export default function ProductsPage () {

  return (
    <>
      <Head>
        <title>Produtos</title>
      </Head>

      <Products />
    </>
  );
};
