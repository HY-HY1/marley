import React, { useEffect, useState } from 'react';
import Style from '../style/cart.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const CartItem = ({ id }) => {
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/product/${id}`);
        setItem(response.data[0]); // Assuming the response is an array with a single item
      } catch (error) {
        console.error(error);
      }
    };
    fetchItem();
  }, [id]);

  return (
    <div>
      <div className={Style.container}>
        <div className={Style.item}>
          {item && (
            <div className={Style.cart}>
              <div className={Style.section}>
                <div className={Style.image}>
                  <Link to={`/product/${item.name}?id=${item.id}`}><img src={item.description?.type?.images[0]} alt={item.name} /></Link>
                </div>
              </div>
              <div className={Style.section}>
                <div className={Style.product}>
                  <ul>
                    <Link to={`/product/${item.name}?id=${item.id}`}><li>{item.name}</li></Link>
                    <li>{item.description.type.sizes.default}</li>
                    <li>{item.price}</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


