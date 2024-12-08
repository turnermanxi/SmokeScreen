import React, { useState, useContext } from 'react';
import { CartContext } from './cartcontext.jsx';
import CheckoutPopup from './Checkout.jsx';

const ShoppingCart = () => {
  const context = useContext(CartContext);
  const { cartItems, totalAmount, removeFromCart } = context;

  const [isCheckoutOpen, setCheckoutOpen] = useState(false); // Local state for opening/closing checkout popup

  // Handle proceeding to checkout
  const handleProceedToCheckout = () => {
    setCheckoutOpen(true);  // Open the checkout popup
  };

  // Handle closing the checkout popup
  const closeCheckout = () => {
    setCheckoutOpen(false);  
  };

  return (
    <div>
      {/* Conditionally render the shopping cart */}
      {!isCheckoutOpen && (
        <div className="shopping-cart">
          <h2>Your Cart</h2>
          <ul>
            {cartItems.length === 0 ? (
              <li>Your cart is empty.</li>
            ) : (
              cartItems.map((item, index) => (
                <li key={index} className="cart-item">
                  <img 
                    src={`https://smokescreenserver.onrender.com${item.image}`} 
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
          <button onClick={handleProceedToCheckout}>Proceed to Checkout</button>
        </div>
      )}
  
      {/* Checkout Popup */}
      {isCheckoutOpen && <CheckoutPopup onClose={closeCheckout} />}
    </div>
  );
}

export default ShoppingCart;
