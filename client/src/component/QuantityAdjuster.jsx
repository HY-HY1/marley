import React from 'react';
import PropTypes from 'prop-types';
import Style from '../style/quantity.module.css';
import { useShop } from '../context/ShopContext';

export const QuantityAdjuster = ({ itemId, quantity, price }) => {
  const { addToCart, removeOneFromCart } = useShop();

  console.log(`price ${price}`)

  const handleDecrease = () => {
    if (quantity >= 1) {
      removeOneFromCart(itemId, price);
    }
  };

  const handleIncrease = () => {
    if (quantity < 5) {
      addToCart(itemId, price);
    }
  };

  return (
    <div className={Style.quantityAdjuster}>
      <button onClick={handleDecrease} className={Style.adjustButton}>
        -
      </button>
      <span className={Style.quantity}>{quantity}</span>
      <button onClick={handleIncrease} disabled={quantity === 5} className={Style.adjustButton}>
        +
      </button>
    </div>
  );
};

QuantityAdjuster.propTypes = {
  itemId: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
};
