import Head from 'next/head';

// Components
import Home from '../components/Home';

export default function IndexPage () {

  return (
    <>
      <Head>
        <title>Index</title>
      </Head>

      <Home />
    </>
  );
};
