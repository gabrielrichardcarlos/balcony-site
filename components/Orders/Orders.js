import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Layout from '../Layout';

import styles from './Orders.module.css';

import { OrdersStore, ordersList, orderProducts } from '../../store/orders';

export default function Orders() {

  const router = useRouter();

  /**
   * Stores
   */
  const orders = OrdersStore.useState(s => s.list);

  /**
   * State
   */
  const [paymentOrder, setPaymentOrder] = useState({ });
  const [orderProductsList, setOrderProductsList] = useState([]);

  /**
   * getAllOrders
   */
  const getAllOrders = async () => {

    ordersList().then((o) => {

      OrdersStore.update(s => {
        s.list = o;
      });
    });
  };

  /**
   * getOrderDetails
   */
  const getOrderDetails = async (order) => {

    const products = await orderProducts(order.id);

    setOrderProductsList(products);
  };

  /**
   * getOrderPaymentDetails
   */
  const getOrderPaymentDetails = async (order) => {

    setPaymentOrder(order);
  };

  /**
   * On component mount
   */
  useEffect(() => {

    getAllOrders();
  }, []);

  /**
   * Render
   */
  return (
    <Layout>
      <div className={styles['orders']}>
        <h1>Pedidos</h1>

        <div className="modal fade" id="productsModal" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Produtos</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div className="modal-body">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Produto</th>
                      <th scope="col">Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderProductsList.map((product, productIndex) => (
                      <tr key={productIndex}>
                        <th scope="row">{product.title}</th>
                        <td scope="row">R$ {product.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="modal-footer">
                <div style={{ marginRight: '20px', }}>Total: <strong>R$ {orderProductsList ? orderProductsList.reduce((a, b) => a + b.price, 0) : 0}</strong></div>
                <button type="button" className="btn btn-secondary ml-5" data-bs-dismiss="modal">Fechar</button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id="paymentModal" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Pagamento</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div className="modal-body">
                <h5>Comprador</h5>
                <p>
                  {paymentOrder.firstName} {paymentOrder.lastName}
                </p>

                <h5 className="mt-2">Endereço</h5>
                <p>
                  {paymentOrder.address} - {paymentOrder.city} ({paymentOrder.state}) - {paymentOrder.zip}
                </p>

                <h5 className="mt-2">Pagamento</h5>
                <p>
                  {paymentOrder.ccName} ({paymentOrder.ccNumber}) <br />
                  {paymentOrder.ccExpiration}
                </p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
              </div>
            </div>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nome completo</th>
              <th scope="col">Produtos</th>
              <th scope="col">Pagamento</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, orderIndex) => (
              <tr key={orderIndex}>
                <th scope="row">{order.id}</th>
                <td scope="row">{order.firstName} {order.lastName}</td>
                <td>
                  <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#productsModal" onClick={() => getOrderDetails(order)}>Ver produtos do pedido</button>
                </td>
                <td>
                  <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#paymentModal" onClick={() => getOrderPaymentDetails(order)}>Detalhes do pagamento</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};
