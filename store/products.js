import { Store } from 'pullstate';

export const ProductsStore = new Store({
  list: [],
});

/**
 * productsList
 */
export const productsList = async () => {

  try {

    const request = await fetch(`http://18.228.30.230:3001/product/list`, {
      method: 'GET',
    });

    const response = await request.json();

    return (response && response.success) ? response.data : undefined;
  }
  catch (error) {
    
    return undefined;
  }
};
