import { useEffect, useState, cloneElement } from 'react';
import { useRouter } from 'next/router';

import Link from 'next/link';

import styles from './Layout.module.css';

import { AuthStore, authUser, authLogout } from '../../store/auth';

export default function Layout (props) {

  const { children } = props;

  const router = useRouter();

  const user = AuthStore.useState(s => s);

  /**
   * gotoLogout
   */
  const gotoLogout = async () => {

    authLogout().then(() => {
  
      AuthStore.update(s => s = null);

      setTimeout(() => {

        router.push('/login');
      }, 1);
    });
  };

  /**
   * On component mount
   */
  useEffect(() => {

    authUser().then(u => {

      AuthStore.update(s => s = u);

      if (!u
        && router.pathname !== '/'
        && router.pathname !== '/register'
        && router.pathname !== '/cart') {
        router.push('/login');
      }
    });
  }, []);

  /**
   * Render
   */
  return (
    <div className={styles['layout']}>
      {!user && (
        <header className={styles['layout__header']}>
          <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
            <Link href="/" passHref>
              <a className="d-flex align-items-center text-dark text-decoration-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="32" className="me-2" viewBox="0 0 118 94" role="img"><title>Bootstrap</title><path fillRule="evenodd" clipRule="evenodd" d="M24.509 0c-6.733 0-11.715 5.893-11.492 12.284.214 6.14-.064 14.092-2.066 20.577C8.943 39.365 5.547 43.485 0 44.014v5.972c5.547.529 8.943 4.649 10.951 11.153 2.002 6.485 2.28 14.437 2.066 20.577C12.794 88.106 17.776 94 24.51 94H93.5c6.733 0 11.714-5.893 11.491-12.284-.214-6.14.064-14.092 2.066-20.577 2.009-6.504 5.396-10.624 10.943-11.153v-5.972c-5.547-.529-8.934-4.649-10.943-11.153-2.002-6.484-2.28-14.437-2.066-20.577C105.214 5.894 100.233 0 93.5 0H24.508zM80 57.863C80 66.663 73.436 72 62.543 72H44a2 2 0 01-2-2V24a2 2 0 012-2h18.437c9.083 0 15.044 4.92 15.044 12.474 0 5.302-4.01 10.049-9.119 10.88v.277C75.317 46.394 80 51.21 80 57.863zM60.521 28.34H49.948v14.934h8.905c6.884 0 10.68-2.772 10.68-7.727 0-4.643-3.264-7.207-9.012-7.207zM49.948 49.2v16.458H60.91c7.167 0 10.964-2.876 10.964-8.281 0-5.406-3.903-8.178-11.425-8.178H49.948z" fill="currentColor"></path></svg>
                <span className="fs-4">balcony project</span>
              </a>
            </Link>

            <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
              <Link href="/" passHref>
                <a className="me-3 py-2 text-dark text-decoration-none">Produtos</a>
              </Link>

              <Link href="/cart" passHref>
                <a className="me-3 py-2 text-dark text-decoration-none">Carrinho</a>
              </Link>

              <Link href="/login" passHref>
                <a className="me-3 py-2 text-dark text-decoration-none">Fazer login</a>
              </Link>
            </nav>
          </div>
        </header>
      )}

      <div className="container-fluid h-100">
        <div className="row h-100">

          {user && (
            <div className={`col-2 p-0 h-100 ${styles['layout__sidebar']}`}>
              <div className="d-flex flex-column flex-shrink-0 p-3 bg-light h-100">
                <span className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none fs-4">Área logada</span>
                
                <hr />

                <ul className="nav nav-pills flex-column mb-auto">
                  <li>
                    <Link href="/dashboard" passHref>
                      <a className={['nav-link', router.pathname === '/dashboard' ? 'active' : null].join(' ')}>
                        Início
                      </a>
                    </Link>
                  </li>

                  <li>
                    <Link href="/products" passHref>
                      <a className={['nav-link', router.pathname === '/products' ? 'active' : null].join(' ')}>
                        Produtos
                      </a>
                    </Link>
                  </li>

                  <li>
                    <Link href="/orders" passHref>
                      <a className={['nav-link', router.pathname === '/orders' ? 'active' : null].join(' ')}>
                        Pedidos
                      </a>
                    </Link>
                  </li>
                </ul>

                <hr />

                <div className="dropdown">
                  <a href="#" className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                    <strong>{user.name} ({user.email})</strong>
                  </a>

                  <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                    <li><a className="dropdown-item" href="#" onClick={gotoLogout}>Sair</a></li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          <div className={`col p-5 ${!user ? 'pt-2' : ''}`}>
            {cloneElement(children, {
              user,
            })}
          </div>
        </div>
      </div>

    </div>
  );
};
