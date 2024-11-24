import React from 'react';

const ShoppingCartNotification = ({ itemCount }) => {
  return (
    <div className="cart-notification">
      {itemCount > 0 && <span>{itemCount}</span>}
    </div>
  );
};

export default ShoppingCartNotification;
