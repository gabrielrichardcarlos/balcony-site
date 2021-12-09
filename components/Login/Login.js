import { useState } from 'react';
import { useRouter } from 'next/router';

import Layout from '../Layout';

import styles from './Login.module.css';

import Link from 'next/link';

import { AuthStore, authUser, authLogout, authValidate } from '../../store/auth';


export default function Login () {

  const router = useRouter();

  /**
   * State
   */
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  /**
   * onSubmit
   */
  const onSubmit = async (event) => {

    event.preventDefault();

    const data = new FormData(event.target);

    setLoading(true);

    authValidate(data)
    
      .then((response) => {

        if (response) {
          setLoading(false);
          setSuccess(true);

          event.target.reset();

          setTimeout(() => router.push('/dashboard'), 250);
        }
        else {
          setLoading(false);
          setSuccess(false);
        }        
      })
      
      .catch(() => {

        setLoading(false);
        setSuccess(false);
      });
  };

  /**
   * Render
   */
  return (
    <Layout>
      <div className={styles['login']}>
        <form className={styles['login__form']} onSubmit={onSubmit}>
          <h1 className="h3 mb-3 fw-normal">Login</h1>

          <div className={[styles['login__input'], 'form-floating'].join(' ')}>
            <input name="email" type="email" className="form-control" id="email" placeholder="nome@exemplo.com" required />
            <label htmlFor="email">Endereço de e-mail</label>
          </div>

          <div className={[styles['login__input'], 'form-floating'].join(' ')}>
            <input name="password" type="password" className="form-control" id="password" placeholder="Senha" required />
            <label htmlFor="password">Senha</label>
          </div>

          {success !== null && (
            <p className={styles['login__message']}>
              {success ? 'Logado com sucesso!' : 'Usuário ou senha inválidos, tente novamente.'}
            </p>
          )}

          <button className={[styles['login__submit'], 'w-100 btn btn-lg btn-primary'].join(' ')} type="submit">
            {loading ? 'Aguarde...' : 'Entrar'}
          </button>

          <div className={styles['login__register']}>
            ou, <Link href="/register">cadastre-se</Link>.
          </div>
        </form>
      </div>
    </Layout>
  );
};
