import Head from 'next/head';

// Components
import Register from '../components/Register';

export default function RegisterPage () {

  return (
    <>
      <Head>
        <title>Cadastro</title>
      </Head>

      <Register />
    </>
  );
};
