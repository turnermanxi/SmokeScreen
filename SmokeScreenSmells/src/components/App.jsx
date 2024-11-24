import { useState, useEffect } from 'react';
import '../CSS/App.css';
import { Shelfscene } from "./shelfscene.jsx";
import ContentBelowShelf from './introsection.jsx';
import { CartProvider } from './cartcontext.jsx';

// Main App Component
function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/products'); // Your API endpoint
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
      
      <h2 className="text-center1"><strong>#1 Second Hand Smokefilter</strong></h2>
        {/* Canvas Section */}
        <div id="canvases">
          {/* Wrapping Canvas in a div to ensure R3F renders properly */}
          <Shelfscene products={products} />
        </div>

        {/* Additional Content */}
        <ContentBelowShelf products={products} />

        {/* Footer */}
        
      </div>
    
  );
}

export default App;

