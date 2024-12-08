import React, { useState, useEffect, useContext } from 'react';
import '../CSS/starterkit.css'; // Add your styles here
import { CartContext } from './cartcontext';
import ShoppingCart from './ShoppingCart'; // Ensure this path is correct
import CheckoutPopup from './Checkout.jsx';
import CartIcon from './ShoppingIcon.jsx';
import { Smokebomb } from './smokebomb';
import { Smokebombp } from './smokebombp';
import { Smokebombb } from './smokebombb';
import { Pinkpuffer } from './pinkpuffer';
import { Meangreen3 } from './meangreen3';
import { Bluemonsoon } from './bluemonsoon';
import { Rollingtrayred } from './RollingTray.jsx';

// Main Starterkit Component with CartProvider wrapper
export function Starterkit() {
  return (
    
      <StarterkitApp />
    
  );
}

// Starterkit Application Component
export function StarterkitApp() {
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { addToCart } = useContext(CartContext); // Use the addToCart function from context
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [showSmokescreens, setShowSmokescreens] = useState(false);
  const [showSmokebombs, setShowSmokebombs] = useState(false);
  const [showAccessories, setShowAccessories] = useState(false);

  const [products, setProducts] = useState({});

  const [popupMessage, setPopupMessage] = useState('');
  const [popupVisible, setPopupVisible] = useState(false);
  const [currentPopupAction, setCurrentPopupAction] = useState(null);

  // Fetch products from the API
  useEffect(() => {
    fetch('https://smokescreenserver.onrender.com/api/products')
      .then((response) => response.json())
      .then((data) => {
        const productsById = data.reduce((acc, product) => {
          acc[product.id] = product;
          return acc;
        }, {});
        setProducts(productsById);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const closeCart = () => {
    setIsCartOpen(false); // Close the cart when the close button is clicked
  };

  // Handle Add to Cart and trigger popup
  const handleAddToCart = (product, message, action) => {
    console.log("Executing popup action");
    addToCart(product); // Add the product first
    if (!product) {
      console.error('Product is undefined or null');
      return;
    }
    console.log('Product to Add:', product); // Log the product
    setPopupMessage(message);
    setPopupVisible(true);
    setCurrentPopupAction(() => action);
    
  };

  // Handle Popup Action
  const handlePopupAction = (action) => {
    if (action) action(); // Execute action if provided
    setPopupVisible(false);
    
  };

  const handleProceedToCheckout = () => {
    toggleCart(); // Use toggleCart to open the cart
    setIsCheckoutOpen(true);
    if (setIsCheckoutOpen(false)) {
      console.error('Checkout is undefined.');
      return;
    }
    setPopupVisible(false);
  };

  // Render Product Cards
  const renderProductCard = (id, title, description, Component, nextAction) => {
    const product = products[id];
    if (!product) return null;

    return (
      <ProductCard
        key={id}
        title={title}
        description={description}
        price={product.price}
        onAddToCart={() =>
          handleAddToCart(
            product, // Pass the product object here
            nextAction.message,
            nextAction.action
          )
        }
      >
        <Component />
      </ProductCard>
    );
  };

  return (
    <div className="starter-kit">
      {/* Flashing Start Kit Button */}
      {!showSmokescreens && (
        <div className="start-kit-container">
          <button
            className="start-kit-button"
            onClick={() => setShowSmokescreens(true)}
          >
            Start Kit
          </button>
        </div>
      )}

      {/* Smokescreens Carousel */}
      {showSmokescreens && (
        <div className="carousel">
          <div id="starter-header">
            <h2>Choose your SmokeScreen</h2>
          </div>
          <div id="description-container">
            <p id="smokebombsection">
              To use your Smokescreen, simply unscrew the top and insert your Smokebomb
              into the bottom. The Smokescreen is designed to trap and neutralize the
              unwanted odors of smoke and pass it to the smokebomb, leaving your
              environment fresh and breathable. It’s a simple, effective solution for
              those who enjoy smoking but want to avoid lingering smells.
            </p>
          </div>
          <div className="carousel-items">
            {renderProductCard(
              1,
              'Pink Puffer',
              '',
              Pinkpuffer,
              {
                message: 'Would you like to continue adding to your smokebomb or continue shopping?',
                action: () => setShowSmokebombs(true),
              }
            )}
            {renderProductCard(
              2,
              'Mean Green',
              '',
              Meangreen3,
              {
                message: 'Would you like to continue adding to your smokebomb or continue shopping?',
                action: () => setShowSmokebombs(true),
              }
            )}
            {renderProductCard(
              3,
              'Blue Monsoon',
              '',
              Bluemonsoon,
              {
                message: 'Would you like to continue adding to your smokebomb or continue shopping?',
                action: () => setShowSmokebombs(true),
              }
            )}
          </div>
        </div>
      )}

      {/* Smokebombs Carousel */}
      {showSmokebombs && (
        <div className="carousel">
          <div id="starter-header">
            <h2>Choose your Smokebombs</h2>
          </div>
          <div id="description-container">
            <p id="smokebombsection">
              Your Smokebomb is the essential filter for using the Smokescreen. Think
              of it as the perfect partner to your Smokescreen—just like butter to bread.
              Made from natural, handmade ingredients, the Smokebomb eliminates smoke
              odors and replaces them with a refreshing, scented breeze.
            </p>
          </div>
          <div className="carousel-items">
            {renderProductCard(
              20,
              'Discreet Linen',
              '',
              Smokebomb,
              {
                message: 'Would you like to move to accessories or proceed to checkout?',
                action: () => setShowAccessories(true),
              }
            )}
            {renderProductCard(
              22,
              'Blossom Distraction',
              '',
              Smokebombp,
              {
                message: 'Would you like to move to accessories or proceed to checkout?',
                action: () => setShowAccessories(true),
              }
            )}
            {renderProductCard(
              23,
              'Weeki Teaki',
              '',
              Smokebombb,
              {
                message: 'Would you like to move to accessories or proceed to checkout?',
                action: () => setShowAccessories(true),
              }
            )}
          </div>
        </div>
      )}

      
      {/* Accessories Section */}
      {showAccessories && (
        <div className="carousel">
          <h2>Accessories</h2>
          <div className="carousel-items">
            {renderProductCard(
              27,
              'Rolling Tray',
              '',
              Rollingtrayred,
              () => <div>Rolling Tray Model</div>,
              {
                message: 'Proceeding to checkout...',
                action: handleProceedToCheckout, // When clicked, trigger checkout popup
              }
            )}
            {/* Add Proceed to Checkout Button */}
            <button onClick={handleProceedToCheckout}>Proceed to Checkout</button>
          </div>
        </div>
      )}

      {/* Popup Box */}
      {popupVisible && (
        <div className="popup">
          <p>{popupMessage}</p>
          <div className="popup-buttons">
            <button onClick={() => setPopupVisible(false)}>Continue Shopping</button>
            {/* For Rolling Tray, update the action */}
            <button onClick={() => handlePopupAction(currentPopupAction)}>
              {popupMessage === 'Proceeding to checkout...' ? 'Proceed to Checkout' : 'Move On'}
            </button>
          </div>
        </div>
      )}

      {/* Checkout Popup */}
      {/* Cart Window */}
      <div className={`checkout-cart ${isCartOpen ? 'open' : ''}`}>
        <ShoppingCart />
        <button className="close-cart-btn" onClick={closeCart}>
          X
        </button>
      </div>
    </div>
  );
}

// Product Card Component
function ProductCard({ title, description, price, onAddToCart, children }) {
  return (
    <div className="product-card">
      <div className="product-3d">{children}</div>
      <div className="product-title">
        <h3>{title}</h3>
      </div>
      <p>{description}</p>
      <p className="product-price"><strong>${price}</strong></p>
      <button onClick={
        onAddToCart}>Add to Cart</button>
    </div>
  );
}
