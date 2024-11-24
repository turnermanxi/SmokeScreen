import React, { useContext, useState } from 'react';
import { CartContext } from './cartcontext.jsx';
import CheckoutPopup from './Checkout.jsx';

const ShoppingCart = () => {
  const context = useContext(CartContext);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Check if context is available
  if (!context) {
    return <div>Loading...</div>;
  }

  const { cartItems, totalAmount, removeFromCart } = context;

  return (
    <div className="shopping-cart">
      <h2>Your Cart</h2>
      <ul>
        {cartItems.length === 0 ? (
          <li>Your cart is empty.</li>
        ) : (
          cartItems.map((item, index) => (
            <li key={index} className="cart-item">
              {/* Display product image */}
              <img 
                src={` https://thawing-wave-12596-662ff1110970.herokuapp.com/${item.image}`} 
                alt={item.name} 
                className="cart-item-image" 
              />
              <div className="cart-item-details">
                <div>{item.name}</div>
                <div>${item.price.toFixed(2)}</div>
                <button onClick={() => removeFromCart(item)}>Remove</button>
              </div>
            </li>
          ))
        )}
      </ul>
      <div className="cart-total">
        <h3>Total: ${totalAmount.toFixed(2)}</h3>
      </div>
      <button onClick={() => setIsCheckoutOpen(true)}>Proceed to Checkout</button>
      
      {/* Render CheckoutPopup when isCheckoutOpen is true */}
      {isCheckoutOpen && <CheckoutPopup onClose={() => setIsCheckoutOpen(false)} />}
    </div>
  );
};

export default ShoppingCart;


