import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from './cartcontext';
import '../CSS/checkout.css';

const CheckoutPopup = ({ onClose }) => {
  const { cartItems, totalAmount } = useContext(CartContext);
  const [paymentForm, setPaymentForm] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [isSquareInitialized, setIsSquareInitialized] = useState(false);
  const [selectedCarrier, setSelectedCarrier] = useState('ups'); // Default to UPS
  const [shippingCost, setShippingCost] = useState(0);
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [shippingError, setShippingError] = useState('');

  const amount = Math.round(totalAmount * 100); // Amount in cents
  const currency = 'USD';
  const totalWeightOz = cartItems.reduce((total, item) => total + (item.weightOz || 0), 0);


  useEffect(() => {
    const fetchShippingCost = async () => {
      // Ensure all required fields are filled
      if (!zip || !city || !state || !address) {
        setShippingError('Please fill in all the address fields.');
        return;
      }
      setShippingError(''); 
  
      try {
        // UPS shipping cost fetch
        const response = await fetch(' https://thawing-wave-12596-662ff1110970.herokuapp.com//api/shipping/ups', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            destinationZip: zip, 
            weightOz: totalWeightOz, 
          }),
        });
  
        if (!response.ok) {
          throw new Error('Error: Unable to fetch shipping rates');
        }
  
        // response to see what the backend returns
        const data = await response.json();
        console.log('Shipping Rate Data:', data); ugging
  
        setShippingCost(data.shippingCost || 0); 
      } catch (error) {
        console.error('Failed to fetch shipping cost:', error);
        setShippingCost(0); // Reset shipping cost to 0 in case of failure
        setShippingError('Failed to fetch shipping cost. Please try again later.');
      }
    };
  
    fetchShippingCost();
  }, [totalWeightOz, zip]); 
  
  // Square Payment
  useEffect(() => {
    const initializeSquarePayment = async () => {
      if (selectedPaymentMethod !== 'square' || isSquareInitialized) return; // Initialize only if Square is selected
      if (!window.Square) {
        console.error('Square SDK failed to load.');
        return;
      }
      
      const payments = window.Square.payments(
        process.env.REACT_APP_SQUARE_APP_ID,
        process.env.REACT_APP_SQUARE_ACCESS_TOKEN
      );

      try {
        const card = await payments.card();
        await card.attach('#sq-card-element');
        setPaymentForm(card);
        setIsSquareInitialized(true);
        console.log('Square Payment form initialized.');
      } catch (error) {
        console.error('Failed to initialize Square payment form:', error);
      }
    };

    initializeSquarePayment();
  }, [selectedPaymentMethod, isSquareInitialized]);

  const handlePayment = async () => {
    if (!paymentForm) {
      console.error('Payment form is not ready.');
      return;
    }

    try {
      const result = await paymentForm.tokenize();
      if (result.status === 'OK') {
        const nonce = result.token;
        processPayment(nonce);
      } else {
        console.error('Tokenization failed:', result.errors);
      }
    } catch (error) {
      console.error('Tokenization error:', error);
    }
  };

  const processPayment = async (nonce) => {
    try {
      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          currency,
          sourceId: nonce,
        }),
      });
      const data = await response.json();
      console.log('Payment response:', data);
      onClose();
    } catch (error) {
      console.error('Payment processing error:', error);
    }
  };

  return (
    <div className="checkout-popup">
      <div className="checkout-content">
        <h2>Checkout</h2>
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              <img src={` https://thawing-wave-12596-662ff1110970.herokuapp.com/${item.image}`} alt={item.name} className="cart-item-image" />
              {item.name} - ${item.price.toFixed(2)}
            </li>
          ))}
        </ul>

        {/* Email Input */}
        <h4>Email:</h4>
        <input
          type="email"
          name="email-confirmation"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />

        {/* Address Inputs */}
        <h4>Enter Address for Shipping:</h4>
        <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
        <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
        <input type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} />
        <input type="text" placeholder="ZIP" value={zip} onChange={(e) => setZip(e.target.value)} />

        {/* Display error if any */}
        {shippingError && <div style={{ color: 'red' }}>{shippingError}</div>}

        {/* Shipping Method Selection */}
        <h4>Select Shipping Carrier:</h4>
        <div>
          <label>
            <input
              type="radio"
              name="shipping-carrier"
              value="ups"
              checked={selectedCarrier === 'ups'}
              onChange={() => setSelectedCarrier('ups')}
            />
            UPS
          </label>
        </div>
        <h4>Shipping Cost: ${shippingCost.toFixed(2)}</h4>

        <div className="total">
          <h3>Total: ${(totalAmount + shippingCost).toFixed(2)}</h3> {/* Update total to include shipping cost */}
        </div>

        {/* Payment Method Selection */}
        <h4>Select Payment Method:</h4>
        <div>
          <label>
            <input
              type="radio"
              name="payment-method"
              value="square"
              checked={selectedPaymentMethod === 'square'}
              onChange={() => setSelectedPaymentMethod('square')}
            />
            Debit/Credit Card
          </label>
          <label>
            <input
              type="radio"
              name="payment-method"
              value="paypal"
              checked={selectedPaymentMethod === 'paypal'}
              onChange={() => setSelectedPaymentMethod('paypal')}
            />
            PayPal
          </label>
        </div>

        {/* Square Payment Form */}
        {selectedPaymentMethod === 'square' && (
          <div id="sq-card-element-container">
            <div id="sq-card-element"></div>
            {!isSquareInitialized && <p>Loading payment form...</p>}
          </div>
        )}

        {/* PayPal Placeholder */}
        {selectedPaymentMethod === 'paypal' && (
          <div>
            <p>PayPal integration coming soon.</p>
          </div>
        )}

       
        <div id="ckbuttons">
          <button
            onClick={handlePayment}
            disabled={!selectedPaymentMethod || !email || !address || !city || !state || !zip || shippingCost <= 0} // Ensure all fields are filled and shipping cost is valid
          >
            Confirm and Pay
          </button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPopup;
