import { useState, useEffect } from 'react';
import '../CSS/App.css';
import { Shelfscene } from "./shelfscene.jsx";
import ContentBelowShelf from './introsection.jsx';
import { CartProvider } from './cartcontext.jsx';
import { Link } from 'react-router-dom';

// Main App Component
function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://smokescreenserver.onrender.com/api/products'); // Your API endpoint
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    
      <div className="App">

<div class="led-banner">
  <div class="led-text">
 Your #1 Second Hand Smoke Filter &nbsp;&nbsp;|&nbsp;&nbsp; 🚨 ENTIRE STORE 20% OFF NORMAL PRICES 🚨 &nbsp;&nbsp;|&nbsp;&nbsp; 
 🛒 Try out the <Link to='/startkit'><strong>Start Kit</strong></Link> ! &nbsp;&nbsp;|&nbsp;&nbsp; 🎉 New Arrival: Rolling Trays in Red! &nbsp;&nbsp;|&nbsp;&nbsp; Your #1 Second Hand Smoke Filter &nbsp;&nbsp;|&nbsp;&nbsp; 🚨 ENTIRE STORE 20% OFF NORMAL PRICES 🚨 &nbsp;&nbsp;|&nbsp;&nbsp; 
 🛒 Try out the <Link to='/startkit'><strong>Start Kit</strong></Link> ! &nbsp;&nbsp;|&nbsp;&nbsp; 🎉 New Arrival: Rolling Trays in Red!
  </div>
</div>

      
     {/* <h2 className="text-center1"><strong>#1 Second Hand Smokefilter</strong></h2> */}
       
        
          {/* Wrapping Canvas in a div to ensure R3F renders properly */}
          <Shelfscene products={products} />
        

        {/* Additional Content */}
        <ContentBelowShelf products={products} />

        {/* Footer */}
        
      </div>
    
  );
}

export default App;

