import { Store } from 'pullstate';

export const OrdersStore = new Store({
  list: [],
});

/**
 * ordersList
 */
export const ordersList = async () => {

  try {

    const request = await fetch(`http://18.228.30.230:3001/order/list`, {
      method: 'GET',
    });

    const response = await request.json();

    return (response && response.success) ? response.data : undefined;
  }
  catch (error) {
    
    return undefined;
  }
};

/**
 * orderProducts
 */
export const orderProducts = async (orderId = 99999) => {

  try {

    const request = await fetch(`http://18.228.30.230:3001/order/products?orderId=${orderId}`, {
      method: 'GET',
    });

    const response = await request.json();

    return (response && response.success) ? response.data : undefined;
  }
  catch (error) {
    
    return undefined;
  }
};
