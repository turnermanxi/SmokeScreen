import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from './cartcontext';
import '../CSS/checkout.css';

const CheckoutPopup = ({ onClose }) => {
  const { cartItems, totalAmount } = useContext(CartContext);
  const [paymentForm, setPaymentForm] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [isSquareInitialized, setIsSquareInitialized] = useState(false);
  const [selectedCarrier, setSelectedCarrier] = useState('ups'); // Default to UPS
  const [shippingCost, setShippingCost] = useState(0);
  const [shippingOptions, setShippingOptions] = useState([]);
  const [selectedShippingOption, setSelectedShippingOption] = useState(null);
  const [error, setError] = useState(''); // Add this state to handle errors
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [shippingError, setShippingError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false); // Prevent multiple submissions
  const [addressFrom] = useState({
    name: 'Smokescreen',
    street1: '5139 Wickview Ln',
    city: 'Houston',
    state: 'TX',
    zip: '77053',
    country: 'US',
    phone: '8134683257',
    email: 'ct@smokescreensmells.com',
  });

  const [addressTo, setAddressTo] = useState({
    name: '',
    street1: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    phone: '',
    email: '',
  });

  const [parcel] = useState({
    length: 8,
    width: 8,
    height: 4,
    distance_unit: 'in',
    weight: 1,
    mass_unit: 'lb',
  });
const [rates, setRates] = useState([]);
const totalWeightOz = cartItems.reduce((total, item) => total + (item.weightOz || 0), 0);

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    setError(null);
    const response = await fetch('https://smokescreenserver.onrender.com/api/create-shipment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ addressFrom, addressTo, parcel }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Error fetching shipment rates.');
    }

    setRates(data.rates); // Set rates to display
  } catch (error) {
    setError(error.message);
  }
};
  // Fetch shipping cost based on user address

  const fetchRates = async () => {
    setShippingError('');
    try {
      const response = await fetch('https://smokescreenserver.onrender.com/api/create-shipment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          addressFrom: {
            street1: '5139 Wickview Ln',
            city: 'Houston',
            state: 'TX',
            zip: '77053',
            country: 'US',
          },
          addressTo: {
            street1: address,
            city: city,
            state: state,
            zip: zip,
            country: 'US',
          },
          parcel: {
            length: 8,
            width: 8,
            height: 4,
            distance_unit: 'in',
            weight: totalWeightOz / 16,
            mass_unit: 'lb',
          },
        }),
      });
  
      if (!response.ok) {
        throw new Error('Unable to fetch shipping rates.');
      }
  
      const data = await response.json();
  
      if (data.rates && data.rates.length > 0) {
        setShippingOptions(data.rates);
        setSelectedShippingOption(data.rates[0]); // Default to first option
      } else {
        setShippingError('No shipping options available.');
      }
    } catch (error) {
      setShippingError('Error fetching shipping rates');
      console.error('Shipping error:', error);
    }
  };
   // Use effect to fetch shipping rates whenever the address changes
   useEffect(() => {
    if (address && zip) fetchRates();
  }, [address, zip]);

 
  const amount = Math.round((totalAmount + shippingCost) * 100); // Total amount with shipping in cents


  // Automatically fetch rates when address or parcel changes
  useEffect(() => {
    if (addressTo.zip && parcel.weight) {
      fetchRates();
    }
  }, [addressTo, parcel]);

  // Initialize Square Payments
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
        setIsSquareInitialized(true);
        console.log('Square Payment Form Initialized');
      } catch (error) {
        console.error('Error initializing Square Payment form:', error);
      }
    };

    initializeSquarePayment();
  }, [selectedPaymentMethod, isSquareInitialized]);

  // Handle Payment Submission
  const handlePayment = async () => {
    if (!paymentForm || isProcessing) return;
    setIsProcessing(true);

    try {
      const result = await paymentForm.tokenize();
      if (result.status === 'OK') {
        const nonce = result.token; // Payment token (nonce)
        await processPayment(nonce);
      } else {
        console.error('Tokenization failed:', result.errors);
      }
    } catch (error) {
      console.error('Error during tokenization:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Process Payment on Backend
  const processPayment = async (nonce) => {
    try {
      const response = await fetch(`https://smokescreenserver.onrender.com/api/payments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,  // Amount to be charged
          currency: 'USD',
          sourceId: nonce,  // The nonce generated by Square
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert('Payment successful!');
      } else {
        console.error('Payment failed:', data.message);
        alert('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Payment processing error:', error);
    }
  };

  return (
    <div className="checkout-popup">
      <div className="checkout-content">
        <h2>Checkout</h2>
  
        {/* Cart Items */}
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
  
        {/* Email Input */}
        <div className="form-section">
          <h4>Email:</h4>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
  
  
        <div>
      <h1>Create Shipment and View Rates</h1>
      <form onSubmit={handleSubmit}>
        <h2>Address To</h2>
        <input
          type="text"
          placeholder="Name"
          value={addressTo.name}
          onChange={(e) => setAddressTo({ ...addressTo, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Street Address"
          value={addressTo.street1}
          onChange={(e) => setAddressTo({ ...addressTo, street1: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="City"
          value={addressTo.city}
          onChange={(e) => setAddressTo({ ...addressTo, city: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="State"
          value={addressTo.state}
          onChange={(e) => setAddressTo({ ...addressTo, state: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="ZIP Code"
          value={addressTo.zip}
          onChange={(e) => setAddressTo({ ...addressTo, zip: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={addressTo.phone}
          onChange={(e) => setAddressTo({ ...addressTo, phone: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={addressTo.email}
          onChange={(e) => setAddressTo({ ...addressTo, email: e.target.value })}
        />
        <button type="submit">Get Rates</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {rates.length > 0 && (
        <div>
          <h2>Shipping Options</h2>
          <ul>
            {rates.map((rate) => (
              <li key={rate.object_id}>
                {rate.provider} - {rate.servicelevel.name} - ${rate.amount}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>  
    </div>
  
        {/* Payment Methods */}
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
            <label>
              <input
                type="radio"
                value="paypal"
                checked={selectedPaymentMethod === 'paypal'}
                onChange={() => setSelectedPaymentMethod('paypal')}
              />
              PayPal
            </label>
          </div>
          {selectedPaymentMethod === 'square' && (
            <div id="sq-card-element-container">
              <div id="sq-card-element"></div>
              {!isSquareInitialized && <p>Loading payment form...</p>}
            </div>
          )}
          {selectedPaymentMethod === 'paypal' && (
            <p>PayPal integration coming soon.</p>
          )}
        </div>
  
        {/* Total and Buttons */}
        <div className="summary">
          <h4>Shipping Cost: ${shippingCost.toFixed(2)}</h4>
          <h3>Total: ${(totalAmount + shippingCost).toFixed(2)}</h3>
        </div>
        <div className="checkout-buttons">
          <button
            onClick={handlePayment}
            disabled={
              !selectedPaymentMethod ||
              !email ||
              !address ||
              !city ||
              !state ||
              !zip ||
              shippingCost <= 0 ||
              isProcessing
            }
          >
            Confirm and Pay
          </button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    
  );  
};

export default CheckoutPopup;
