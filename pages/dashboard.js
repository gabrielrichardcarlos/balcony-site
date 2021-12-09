import Head from 'next/head';

// Components
import Dashboard from '../components/Dashboard';

export default function DashboardPage () {

  return (
    <>
      <Head>
        <title>Produtos</title>
      </Head>

      <Dashboard />
    </>
  );
};
