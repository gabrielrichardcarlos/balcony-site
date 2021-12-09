import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Layout from '../Layout';

import styles from './Products.module.css';

import { ProductsStore, productsList } from '../../store/products';

const defaultValues = {
  identifier: '',
  title: '',
  description: '',
  price: '',
  image: '',
};

export default function Products() {

  const router = useRouter();

  /**
   * State
   */
  const [edit, setEdit] = useState(false);
  const [fields, setFields] = useState({
    ...defaultValues,
  });

  /**
   * Stores
   */
  const products = ProductsStore.useState(s => s.list);

  /**
   * getJwtToken
   */
  const getJwtToken = () => {

    return localStorage.getItem('access_token');
  };

  /**
   * onSubmit
   */
  const onSubmit = async (event) => {

    event.preventDefault();

    const data = new FormData(event.target);
    const token = getJwtToken();

    try {

      const request = await fetch(`http://18.228.30.230:3001/product/${edit ? 'edit' : 'create'}`, {
        method: edit ? 'PUT' : 'POST',
        body: data,
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const response = await request.json();

      setFields({ ...defaultValues });
      setEdit(false);
      getAllProducts();
    }
    catch (error) {
      
    }
  };

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
   * onEdit
   */
  const onEdit = (product) => {

    setEdit(true);

    setFields({
      ...fields,
      ...product,
    });
  };

  /**
   * onDelete
   */
  const onDelete = async (product) => {

    const token = getJwtToken();

    try {

      const data = new FormData();

      data.append('id', product.id);

      const request = await fetch(`http://18.228.30.230:3001/product/delete`, {
        method: 'DELETE',
        body: data,
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const response = await request.json();

      setFields({ ...defaultValues });
      setEdit(false);
      getAllProducts();
    }
    catch (error) {
      console.log(error);
    }
    finally {

    }
  };

  /**
   * handleChange
   */
  const handleChange = (event) => {

    const { target } = event;

    setFields({
      ...fields,
      [target.name]: target.value,
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
      <div className={styles['products']}>
        <h1>Produtos</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Identificador</th>
              <th scope="col">Produto</th>
              <th scope="col">Descrição</th>
              <th scope="col">Valor</th>
              <th scope="col">Imagem</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, productIndex) => (
              <tr key={productIndex}>
                <th scope="row">{product.id}</th>
                <td scope="row">{product.identifier}</td>
                <td>{product.title}</td>
                <td>{product.description}</td>
                <td>R$ {product.price}</td>
                <td>
                  <a href={product.image} target="_blank" rel="noreferrer">
                    <img src={product.image} alt={product.title} width={64} />
                  </a>
                </td>
                <td>
                  <button type="button" className="btn btn-primary" onClick={() => onEdit(product)}>Editar</button> &nbsp;
                  <button type="button" className="btn btn-danger" onClick={() => onDelete(product)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <br /> <br />

        <h1>{edit ? 'Editar' : 'Cadastrar'} produto {edit ? `#${fields.id} (${fields.title})` : null}</h1>
        <form className={styles['products__form']} onSubmit={onSubmit}>

          {edit && (
            <input name="id" type="hidden" value={fields.id} onChange={handleChange} />
          )}

          <div className="mb-3">
            <label htmlFor="identifierInput" className="form-label">Código identificador</label>
            <input name="identifier" type="text" className="form-control" id="identifierInput" placeholder="ex: ABC-123" value={fields.identifier} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label htmlFor="titleInput" className="form-label">Título</label>
            <input name="title" type="text" className="form-control" id="titleInput" placeholder="título do produto" value={fields.title} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label htmlFor="descriptionInput" className="form-label">Descrição</label>
            <textarea name="description" className="form-control" id="descriptionInput" rows="3" placeholder="descrição do produto" value={fields.description} onChange={handleChange}></textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="priceInput" className="form-label">Preço</label>
            <input name="price" type="number" className="form-control" id="priceInput" placeholder="valor do produto" value={fields.price} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label htmlFor="imageInput" className="form-label">Link da imagem</label>
            <input name="image" type="text" className="form-control" id="imageInput" placeholder="imagem do produto" value={fields.image} onChange={handleChange} />
          </div>

          <button type="submit" className="btn btn-primary">{edit ? 'Editar' : 'Cadastrar'}</button>
        </form>
      </div>
    </Layout>
  );
};
