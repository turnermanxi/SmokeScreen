import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from './cartcontext';
import '../CSS/checkout.css';

const CheckoutPopup = ({ onClose }) => {
  const { cartItems, totalAmount } = useContext(CartContext);
  const [paymentForm, setPaymentForm] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [isSquareInitialized, setIsSquareInitialized] = useState(false);
  const [selectedCarrier, setSelectedCarrier] = useState('ups');
  const [shippingCost, setShippingCost] = useState(0);
  const [shippingOptions, setShippingOptions] = useState([]);
  const [selectedShippingOption, setSelectedShippingOption] = useState(null);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [addressTo, setAddressTo] = useState({
    name: '',
    street1: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
    phone: '',
    email: '',
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const addressFrom = {
    name: 'SmokeScreen',
    street1: '5139 Wickview Ln',
    city: 'Houston',
    state: 'TX',
    zip: '77053',
    country: 'US',
    phone: '8134683257',
    email: 'ct@smokescreensmells.com',
  };

  const parcel = {
    length: 8,
    width: 8,
    height: 4,
    distance_unit: 'in',
    weight: cartItems.reduce((total, item) => total + (item.weightOz || 0), 0) / 16, // Convert oz to lbs
    mass_unit: 'lb',
  };

  const amount = Math.round((totalAmount + shippingCost) * 100);

  const fetchRates = async () => {
    setError('');
    try {
      // Clean addressTo object by ensuring 'name' field is not sent if undefined
      const addressToForRequest = { ...addressTo };
      if (!addressToForRequest.name || addressToForRequest.name === '') {
        delete addressToForRequest.name; // Remove 'name' if it's not provided or empty
      }
  
      const addressFromForRequest = { ...addressFrom };
  
      // Log the request body to check if everything is correct
      console.log('Request payload:', {
        addressFrom: addressFromForRequest,
        addressTo: addressToForRequest,  // Send the modified addressTo without 'name' if undefined
        parcel,
      });
  
      const response = await fetch('https://smokescreenserver.onrender.com/api/create-shipment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          addressFrom: addressFromForRequest,
          addressTo: addressToForRequest,
          parcel,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Unable to fetch shipping rates.');
      }
  
      const data = await response.json();
      if (data.rates && data.rates.length > 0) {
        setShippingOptions(data.rates);
        setSelectedShippingOption(data.rates[0]);
        setShippingCost(parseFloat(data.rates[1].rate));
      } else {
        setError('No shipping options available.');
      }
    } catch (err) {
      setError('Failed to fetch shipping rates.');
      console.error('Shipping error:', err);
    }
  };

  const addToMailchimp = async (email) => {
    try {
      const response = await fetch('https://smokescreenserver.onrender.com/api/mailchimp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
  
      const data = await response.json();
      if (data.success) {
        console.log('Email added to Mailchimp successfully.');
      } else {
        console.error('Failed to add email to Mailchimp:', data.message);
      }
    } catch (err) {
      console.error('Error adding email to Mailchimp:', err);
    }
  };
  
  // Trigger shipping rate fetch when address is updated
  useEffect(() => {
    if (addressTo.street1 && addressTo.zip) {
      fetchRates();
    }
  }, [addressTo]);

  useEffect(() => {
    const initializeSquarePayment = async () => {
      if (!window.Square || !window.Square.payments) {
        console.error('Square SDK failed to load.');
        return;
      }
  
      const cardElement = document.getElementById('sq-card-element');
      if (!cardElement) {
        console.error('Square card element not found.');
        return;
      }
  
      try {
        const payments = window.Square.payments('sq0idp-jKhuEXoEy9Lmw9sO-A61ow');
        const card = await payments.card();
        await card.attach('#sq-card-element');
        setPaymentForm(card);
        setIsSquareInitialized(true); // Only set this to true once initialized
        console.log('Square Payment Form Initialized');
      } catch (error) {
        console.error('Error initializing Square Payment form:', error);
      }
    };
  
    if (selectedPaymentMethod === 'square' && !isSquareInitialized) {
      initializeSquarePayment();
    }
  
  }, [selectedPaymentMethod, isSquareInitialized]);
  
  const handlePayment = async () => {
    if (!paymentForm || isProcessing) return;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      alert('Please provide a valid email address.');
      return;
    }

    setIsProcessing(true);

    try {
      const result = await paymentForm.tokenize();
      if (result.status === 'OK') {
        const nonce = result.token;
        await processPayment(nonce);
      } else {
        console.error('Tokenization failed:', result.errors);
      }
    } catch (err) {
      console.error('Error during tokenization:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const processPayment = async (nonce) => {
    try {
      const response = await fetch('https://smokescreenserver.onrender.com/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          currency: 'USD',
          sourceId: nonce,
          email,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert('Payment successful!');
        await addToMailchimp(email);
      } else {
        console.error('Payment failed:', data.message);
        alert('Payment failed. Please try again.');
      }
    } catch (err) {
      console.error('Payment processing error:', err);
    }
  };

  

  return (
    <div className="checkout-popup">
      <div className="checkout-content">
        <h2>Checkout</h2>
        <ul className="cart-items-list">
          {cartItems.map((item, index) => (
            <li key={index} className="cart-item">
              <img
                src={`https://smokescreenserver.onrender.com${item.image}`}
                alt={item.name}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <span>{item.name}</span>
                <span>${item.price.toFixed(2)}</span>
              </div>
            </li>
          ))}
        </ul>
        <h4>Contact Information</h4>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="form-section">
          <h4>Shipping Address</h4>
          <input type="text" placeholder="Name" value={addressTo.name} onChange={(e) => setAddressTo({ ...addressTo, name: e.target.value })} />
          <input type="text" placeholder="Street" value={addressTo.street1} onChange={(e) => setAddressTo({ ...addressTo, street1: e.target.value })} />
          <input type="text" placeholder="City" value={addressTo.city} onChange={(e) => setAddressTo({ ...addressTo, city: e.target.value })} />
          <input type="text" placeholder="State" value={addressTo.state} onChange={(e) => setAddressTo({ ...addressTo, state: e.target.value })} />
          <input type="text" placeholder="ZIP Code" value={addressTo.zip} onChange={(e) => setAddressTo({ ...addressTo, zip: e.target.value })} />
        </div>
        <div className="shipping-info">
           <p>
              All packages will ship within at least 2 business days. For the best pricing, we recommend choosing Ground Shipping. Products typically ship within 3-5 business days.
            </p>
        </div>

        {shippingOptions.length > 0 && (
          <div className="shipping-options">
            <h4>Shipping Options:</h4>
            <ul>
              {shippingOptions.map((option) => (
                <li key={option.object_id}>
                  <label>
                    <input
                      type="radio"
                      name="shippingOption"
                      checked={option.object_id}
                      onChange={() => {
                        setSelectedShippingOption(option);
                        const cost = parseFloat(option.amount || option.rate || option.price || 0);
                        setShippingCost(cost); 
                      }}
                    />
                    {(option.carrier || 'Unknown Carrier')} - 
                    {(option.servicelevel?.name || option.service || 'Unknown Service')} - 
                    ${option.amount || option.rate || option.price || 'N/A'}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="summary">
          <h4>Shipping Cost: ${shippingCost.toFixed(2)}</h4>
          <h3>Total: ${(totalAmount + shippingCost).toFixed(2)}</h3>
        </div>
        <div className="form-section">
          <h4>Select Payment Method:</h4>
          <div>
            <label>
              <input
              type="radio"
              value="square"
              checked={selectedPaymentMethod === 'square'}
              onChange={() => setSelectedPaymentMethod('square')}
              />
              Debit/Credit Card
            </label>
          </div>
          {selectedPaymentMethod === 'square' && (
            <div id="sq">
              <div id="sq-card-element"></div>
              {!isSquareInitialized && <p>Loading payment form...</p>}
            </div>
          )}
        </div>
        <div className="button-container">
          <button className="cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="submit" onClick={handlePayment} disabled={isProcessing}>
            {isProcessing ? 'Processing...' : 'Complete Payment'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPopup;
