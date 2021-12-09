import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Layout from '../Layout';

import styles from './Dashboard.module.css';

import { ProductsStore, productsList } from '../../store/products';

export default function Dashboard () {

  const router = useRouter();

  /**
   * Stores
   */
  const products = ProductsStore.useState(s => s.list);

  /**
   * getAllProducts
   */
  const getAllProducts = async () => {

    productsList().then((p) => {

      ProductsStore.update(s => {
        s.list = p;
      });
    });
  };

  /**
   * On component mount
   */
  useEffect(() => {

    getAllProducts();
  }, []);

  /**
   * Render
   */
  return (
    <Layout>
      <div className={styles['dashboard']}>
        <h1>Início</h1>
        <p>Bem-vindo!</p>
      </div>
    </Layout>
  );
};
