import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Layout from '../Layout';

import styles from './Home.module.css';

import { ProductsStore, productsList } from '../../store/products';
import { CartStore } from '../../store/cart';

import { route } from 'next/dist/server/router';

export default function Home () {

  const router = useRouter();

  /**
   * Stores
   */
  const products = ProductsStore.useState(s => s.list);
  const cart = CartStore.useState(s => s);

  /**
   * getAllProducts
   */
  const getAllProducts = () => {

    productsList().then((p) => {

      ProductsStore.update(s => {
        s.list = p;
      });
    });
  };

  /**
   * addToCart
   */
  const addToCart = (product) => {

    CartStore.update(s => {

      s.products = [...cart.products, product];
    });

    router.push('/cart');
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
      <div className={styles['home']}>
        <h1 className={styles['home__title']}>Produtos</h1>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

          {(products && !products.length) && (
            <p>Não existem produtos cadastrados.</p>
          )}

          {products && products.map((product, productIndex) => (
            <div className="col" key={productIndex}>
              <div className="card shadow-sm">
                <img className="bd-placeholder-img card-img-top" src={product.image} width="100%" height="225" />

                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">{product.description}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">R$ {product.price}</small>
                  </div>
                  <a href="#" className="btn btn-primary mt-3 w-100" onClick={() => addToCart(product)}>Adicionar ao carrinho</a>
                </div>
              </div>
            </div>
          ))}
 
        </div>
      </div>
    </Layout>
  );
};
