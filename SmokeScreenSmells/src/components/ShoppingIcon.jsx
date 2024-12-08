import React, { useContext, useState } from 'react';
import { CartContext } from './cartcontext.jsx';
import ShoppingCart from './ShoppingCart'; // Ensure this path is correct
import ShoppingCartNotification from './ShopNotification';
import CheckoutPopup from './Checkout.jsx';

const CartIcon = () => {
  const { cartItems } = useContext(CartContext);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Toggle cart visibility
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    if (isCheckoutOpen) setIsCheckoutOpen(false); // Close checkout when cart is toggled
  };

  // Open checkout when proceeding from the cart
  const openCheckout = () => {
    setIsCartOpen(false);  // Close the cart when opening checkout
    setIsCheckoutOpen(true);  // Open checkout
  };

  return (
    <div className="cart-icon-container">
  <div className="cart-icon">
    <button onClick={toggleCart}>
      <img src="cart.png" alt="Cart Icon" />
      {cartItems.length > 0 && <ShoppingCartNotification itemCount={cartItems.length} />}
    </button>
  </div>

  <div className={`checkout-cart ${isCartOpen ? 'open' : isCheckoutOpen ? 'hidden' : 'closed'}`}>
    <ShoppingCart toggleCart={toggleCart} openCheckout={openCheckout} />
    <button className="close-cart-btn" onClick={toggleCart}>X</button>
  </div>

  {isCheckoutOpen && <CheckoutPopup onClose={() => setIsCheckoutOpen(false)} />}
</div>
  );
};

export default CartIcon;