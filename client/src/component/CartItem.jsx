// CartItem.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Style from '../style/cart.module.css';
import { QuantityAdjuster } from './QuantityAdjuster';

export const CartItem = ({ id, quantity }) => {
  const [item, setItem] = useState(null);
  const [price, setPrice] = useState(null)

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/product/${id}`);
        setItem(response.data[0]); // Assuming the response is an array with a single item
        console.log('Item Price', item)
      } catch (error) {
        console.error(error);
      }
    };

    fetchItem();
  }, []);

  return (
    <div className={Style.container}>
      
      <div className={Style.item}>
        {item && (
          <div className={Style.cart}>
            <div className={Style.section}>
              <div className={Style.image}>
                <Link to={`/product/${item.name}?id=${item.id}`}>
                  <img src={item.description?.type?.images[0]} alt={item.name} />
                </Link>
              </div>
            </div>
            <div className={Style.section}>
              <div className={Style.product}>
                <div className={Style.productGrid}>
                  <div className={Style.gridItem}>
                    <div className={Style.name}>
                          <Link to={`/product/${item.name}?id=${item.id}`}>
                            {item.name}
                          </Link>
                        </div>
                      <div className={Style.price}>
                        <b>£{item.price}</b>
                      </div>
                      </div>
                      <div className={Style.gridItem}>
                        <div className={Style.quantity}>
                          <QuantityAdjuster price={item.price} itemId={id} quantity={quantity} />
                        </div>
                      </div>
                      <div className={Style.gridItem}>
                        <div className={Style.totalPrice}>
                          <b>£{item.price * parseInt(quantity)}</b>
                        </div>
                      </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

