import React, { useContext } from 'react';
import { CartContext } from './cartcontext';

const CartNotification = () => {
  const { cartCount } = useContext(CartContext);

  return (
    <div className="cart-icon">
      <i className="fas fa-shopping-cart"></i>
      <span className="cart-count">({cartCount})</span>
    </div>
  );
};

export default CartNotification;
