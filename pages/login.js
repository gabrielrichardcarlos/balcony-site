import Head from 'next/head';

// Components
import Login from '../components/Login';

export default function LoginPage () {

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <Login />
    </>
  );
};
