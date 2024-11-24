import React, { useContext, useState } from 'react';
import { CartContext } from './cartcontext.jsx'; // Ensure this path is correct
import ShoppingCart from './ShoppingCart'; // Ensure this path is correct
import ShoppingCartNotification from './ShopNotification';

const CartIcon = () => {
  const { cartItems } = useContext(CartContext);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const closeCart = () => {
    setIsCartOpen(false); // Close the cart when the close button is clicked
  };

  return (
    <div className="cart-icon-container">
      {/* Cart Icon with Notification */}
      <div className="cart-icon">
        <button onClick={toggleCart}>
          <img src="cart.png" alt="Cart Icon" />
          {cartItems.length > 0 && <ShoppingCartNotification itemCount={cartItems.length} />}
        </button>
      </div>

      {/* Cart Window with Close Button */}
      <div className={`checkout-cart ${isCartOpen ? 'open' : ''}`}>
        <ShoppingCart />
        <button className="close-cart-btn" onClick={closeCart}>
        >>
        </button>
      </div>
    </div>
  );
};

export default CartIcon;
