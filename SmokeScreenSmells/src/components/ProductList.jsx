import React, { useEffect, useState, useContext } from 'react';
import { usePopup } from './RootLayout'; // Import the custom hook
import '../CSS/ProductList.css';
import { Navbar } from './Navbar';
import { CartContext } from './cartcontext';
import { Canvas } from '@react-three/fiber';
import { Smokebomb } from './smokebomb';
import { Smokebombp } from './smokebombp';
import { Smokebombb } from './smokebombb';
import { Pinkpuffer } from './pinkpuffer';
import { Meangreen2 } from './meangreen2';
import { Bluemonsoon } from './bluemonsoon';
import { Rollingtrayred } from './RollingTray';

const sceneComponents = {
    Smokebomb: Smokebomb,
    Smokebombp: Smokebombp,
    Smokebombb: Smokebombb,
    Pinkpuffer: Pinkpuffer,
    Meangreen: Meangreen2,
    Bluemonsoon: Bluemonsoon,
    Rollingtrayred: Rollingtrayred,
};

const ProductList = () => {
    const { addToCart } = useContext(CartContext);
    const { showPopup } = usePopup(); // Access showPopup here
    const [products, setProducts] = useState([]);
    const [showScenes, setShowScenes] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://smokescreenserver.onrender.com/api/products');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data);
                setShowScenes(data.reduce((acc, product) => {
                    acc[product.id] = false;
                    return acc;
                }, {}));
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const toggleView = (id) => {
        setShowScenes((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    const handleAddToCart = (product) => {
        addToCart(product); // Add to cart logic
        showPopup(`${product.name} has been added to the cart!`); // Show popup
    };

    if (loading) {
        return <div className="text-center">Loading products...</div>;
    }

    if (error) {
        return <div className="text-center">Error: {error}</div>;
    }

    return (
        <div className="container">
            <h2 className="text-center1"><strong>Our Products</strong></h2>
            <div className="row">
                {products.map((product) => {
                    const SceneComponent = sceneComponents[product.sceneId];
                    const showScene = showScenes[product.id];

                    return (
                        <div key={product.id} className="col-md-4 mb-4">
                            <div className="card h-100 text-center">
                                <div className="carousel">
                                    {showScene && SceneComponent ? (
                                        <div className="card-scene">
                                            <SceneComponent />
                                        </div>
                                    ) : (
                                        <img
                                            src={`https://smokescreenserver.onrender.com${product.image}`}
                                            alt={product.name}
                                            className="card-img-top"
                                        />
                                    )}
                                    <div className="carousel-controls">
                                        <button onClick={() => toggleView(product.id)}>
                                            {showScene ? "View Image" : "View 3D Scene"}
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">${product.price.toFixed(2)}</p>
                                    <button className="btn btn-primary" onClick={() => handleAddToCart(product)}>
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProductList;
