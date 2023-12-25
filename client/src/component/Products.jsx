import React from 'react';
import { useProductContext } from '../context/ProductContext';
import { Link } from 'react-router-dom';
import Style from '../style/product.module.css';

export const Products = () => {
  const { products } = useProductContext();

  return (
    <>
      <div className={Style.products}>
        {products.map((product) => (
          <div className={Style.product} key={product._id}>

            {product.description.type.images && (
              <div className={Style.images}>
                <Link to={`/product/${product.name.toLowerCase()}?id=${product.id}`}>
                  <img
                    className={Style.img}
                    src={product.description.type.images[0]}
                    alt=""
                  />
                </Link>
              </div>
            )}
            <div className={Style.text}>
            <h3>{product.name}</h3>
            <p>£{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
