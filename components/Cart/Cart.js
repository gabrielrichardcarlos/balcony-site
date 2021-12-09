import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Layout from '../Layout';

import styles from './Cart.module.css';

import { AuthStore } from '../../store/auth';
import { CartStore } from '../../store/cart';

export default function Cart () {

  const router = useRouter();

  /**
   * Stores
   */
  const cart = CartStore.useState(s => s);

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

    for (var i = 0; i < cart.products.length; i++) {
      data.append('products[]', JSON.stringify(cart.products[i]));
    }

    try {
 
      setLoading(true);
 
      const request = await fetch(`http://18.228.30.230:3001/order/create`, {
        method: 'POST',
        body: data,
      });
 
      const response = await request.json();
 
      if (response && response.success) {

        event.target.reset();

        CartStore.update(s => {

          s.products = [];
        });

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
   * On component mount
   */
  useEffect(() => {

  }, []);

  /**
   * On success
   */
  if (success) {
  
    return (
      <Layout>
        <div className={styles['cart']}>
          <h1 className={styles['cart__title']}>Pronto</h1>
          <p>Pedido realizado com sucesso!</p>
        </div>
      </Layout>
    );
  }

  /**
   * Render
   */
  return (
    <Layout>
      <div className={styles['cart']}>
        <h1 className={styles['cart__title']}>Carrinho</h1>

        <div className="row g-5">
          <div className="col-md-5 col-lg-4 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-primary">Produtos</span>
              <span className="badge bg-primary rounded-pill">{(cart.products ? cart.products.length : 0)}</span>
            </h4>

            <ul className="list-group mb-3">
              {!!(cart.products && cart.products.length) && cart.products.map((product, productIndex) => (
                <li
                  className="list-group-item d-flex justify-content-between lh-sm"
                  key={productIndex}
                >
                  <div>
                    <h6 className="my-0">{product.title}</h6>
                    <small className="text-muted">{product.description}</small>
                  </div>
                  <span className="text-muted">R$ {product.price}</span>
                </li>
              ))}

              <li className="list-group-item d-flex justify-content-between">
                <span>Total</span>
                <strong>R$ {cart.products ? cart.products.reduce((a, b) => a + b.price, 0) : 0}</strong>
              </li>
            </ul>
          </div>

          <div className="col-md-7 col-lg-8">
            <h4 className="mb-3">Endereço</h4>
          
            <form className="checkout-form" onSubmit={onSubmit} noValidate="">
              <div className="row g-3">
                <div className="col-sm-6">
                  <label htmlFor="firstName" className="form-label">Nome</label>
                  <input type="text" className="form-control" name="firstName" id="firstName" placeholder="Primeiro nome" defaultValue="" required="" />
                </div>

                <div className="col-sm-6">
                  <label htmlFor="lastName" className="form-label">Sobrenome</label>
                  <input type="text" className="form-control" name="lastName" id="lastName" placeholder="Seu sobrenome" defaultValue="" required="" />
                </div>

                <div className="col-12">
                  <label htmlFor="email" className="form-label">E-mail</label>
                  <input type="email" className="form-control" name="email" id="email" placeholder="email@exemplo.com" />
                </div>

                <div className="col-12">
                  <label htmlFor="address" className="form-label">Endereço</label>
                  <input type="text" className="form-control" name="address" id="address" placeholder="Ex: Avenida Paulista, 123" required="" />
                </div>

                <div className="col-md-5">
                  <label htmlFor="country" className="form-label">País</label>
                  <select className="form-select" name="country" id="country" required="">
                    <option defaultValue="Brasil">Brasil</option>
                    <option defaultValue="Estados Unidos">Estados Unidos</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <label htmlFor="state" className="form-label">Estado</label>
                  <input type="text" className="form-control" name="state" id="state" placeholder="Ex: Rio de Janeiro" required="" />
                </div>

                <div className="col-md-3">
                  <label htmlFor="zip" className="form-label">CEP</label>
                  <input type="text" className="form-control" name="zip" id="zip" placeholder="00000-000" required="" />
                </div>
              </div>

              <h4 className="mt-4 mb-3">Pagamento (cartão de crédito)</h4>

              <div className="row gy-3">
                <div className="col-md-6">
                  <label htmlFor="ccName" className="form-label">Nome do titular</label>
                  <input type="text" className="form-control" name="ccName" id="ccName" placeholder="Nome do titular" required="" />
                  <small className="text-muted">Exatamente como está no cartão</small>
                </div>

                <div className="col-md-6">
                  <label htmlFor="ccNumber" className="form-label">Número do cartão</label>
                  <input type="text" className="form-control" name="ccNumber" id="ccNumber" placeholder="0000 0000 0000 0000" required="" />
                </div>

                <div className="col-md-3">
                  <label htmlFor="ccExpiration" className="form-label">Data de validade</label>
                  <input type="text" className="form-control" name="ccExpiration" id="ccExpiration" placeholder="Ex: 10/2025" required="" />
                </div>

                <div className="col-md-3">
                  <label htmlFor="ccCvv" className="form-label">CVV</label>
                  <input type="text" className="form-control" name="ccCvv" id="ccCvv" placeholder="000" required="" />
                </div>
              </div>   

              <button className="mt-4 w-100 btn btn-primary btn-lg" type="submit" disabled={loading}>
                {loading ? 'Finalizando pedido...' : 'Finalizar meu pedido'}
              </button>           
            </form>
          </div>
        </div>

      </div>
    </Layout>
  );
};
