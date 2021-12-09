import { useState } from 'react';

import Layout from '../Layout';

import styles from './Register.module.css';

import Link from 'next/link';

export default function Register () {

  /**
   * State
   */
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [validation, setValidation] = useState(null);
 
  /**
   * onSubmit
   */
  const onSubmit = async (event) => {
 
    event.preventDefault();
 
    const data = new FormData(event.target);

    if (data.get('password') !== data.get('passwordConfirm')) {
      setValidation(false);
      return;
    }
    else {
      setValidation(null);
    }
 
    try {
 
      setLoading(true);
 
      const request = await fetch(`http://18.228.30.230:3001/user/create`, {
        method: 'POST',
        body: data,
      });
 
      const response = await request.json();
 
      if (response && response.success) {

        event.target.reset();

        setSuccess(true);
      }
      else {
        setSuccess(false);
      }
    }
    catch (error) {
      setSuccess(false);
    }
    finally {
 
      setLoading(false);
    }
  };
 
  /**
   * Render
   */
  return (
    <Layout>
      <div className={styles['register']}>
        
        <form className={styles['register__form']} onSubmit={onSubmit}>
          <h1 className="h3 mb-3 fw-normal">Cadastro</h1>

          <div className={[styles['register__input'], 'form-floating'].join(' ')}>
            <input name="name" type="text" className="form-control" id="name" placeholder="Nome" required />
            <label htmlFor="name">Nome</label>
          </div>

          <div className={[styles['register__input'], 'form-floating'].join(' ')}>
            <input name="email" type="email" className="form-control" id="email" placeholder="nome@exemplo.com" required />
            <label htmlFor="email">Endereço de e-mail</label>
          </div>

          <div className={[styles['register__input'], 'form-floating'].join(' ')}>
            <input name="password" type="password" className="form-control" id="password" placeholder="Senha" required />
            <label htmlFor="password">Senha</label>
          </div>

          <div className={[styles['register__input'], 'form-floating'].join(' ')}>
            <input name="passwordConfirm" type="password" className="form-control" id="passwordConfirm" placeholder="Confirmar senha" required />
            <label htmlFor="passwordConfirm">Confirmar senha</label>
          </div>

          <div className={[styles['register__input'], 'form-floating'].join(' ')}>
            <input name="phone" type="text" className="form-control" id="phone" placeholder="Telefone" required />
            <label htmlFor="phone">Telefone</label>
          </div>

          {validation !== null && (
            <p className={styles['login__message']}>
              As senhas devem ser iguais.
            </p>
          )}

          {success !== null && (
            <p className={styles['login__message']}>
              {success ? 'Cadastro efetuado com sucesso!' : 'Ocorreu algum problema, verifique se o usuário já existe.'}
            </p>
          )}

          <button className={[styles['register__submit'], 'w-100 btn btn-lg btn-primary'].join(' ')} type="submit">
            {loading ? 'Aguarde...' : 'Cadastrar'}
          </button>

          <div className={styles['register__register']}>
            se já for cadastrado, <Link href="/login">entre aqui</Link>.
          </div>
        </form>

      </div>
    </Layout>
  );
};
