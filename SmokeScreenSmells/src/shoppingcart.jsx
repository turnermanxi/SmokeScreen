import React, { Component } from 'react';
import { Scene1 } from './smokescreen1.jsx';

const products = [
    { id: 1, name: 'RedPuffer', price: 7.99, draw: Scene1 },
    { id: 2, name: 'Smartphone', price: 500, image: 'path/to/smartphone.jpg' },
    { id: 3, name: 'Headphones', price: 150, image: 'path/to/headphones.jpg' },
  ];
  
  // ShoppingCart class component
  class ShoppingCart extends Component {
    constructor(props) {
      super(props);
      this.state = {
        cart: [],
      };
    }
  
    // Add product to the cart
    addToCart = (product) => {
      this.setState((prevState) => {
        const itemExists = prevState.cart.find((item) => item.id === product.id);
        if (itemExists) {
          // If the product already exists in the cart, increase the quantity
          return {
            cart: prevState.cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          };
        } else {
          // Add new product to the cart with a quantity of 1
          return { cart: [...prevState.cart, { ...product, quantity: 1 }] };
        }
      });
    };
  
    // Remove product from the cart
    removeFromCart = (productId) => {
      this.setState((prevState) => ({
        cart: prevState.cart.filter((item) => item.id !== productId),
      }));
    };
  
    // Calculate total price of the cart
    calculateTotalPrice = () => {
      const { cart } = this.state;
      return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };
    render() {
        const { cart } = this.state;
    
        return (
          <div className="shopping-cart">
            <h1>Shopping Cart</h1>
    
            <div className="product-list">
              <h2>Products</h2>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {products.map((product) => (
                  <li key={product.id} style={{ marginBottom: '20px' }}>
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    />
                    <div>{product.name} - ${product.price}</div>
                    <button onClick={() => this.addToCart(product)}>
                      Add to Cart
                    </button>
                  </li>
                ))}
              </ul>
            </div>
    
            <div className="cart">
              <h2>Your Cart</h2>
              {cart.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {cart.map((item) => (
                    <li key={item.id} style={{ marginBottom: '20px' }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: '50px',
                          height: '50px',
                          objectFit: 'cover',
                          marginRight: '10px',
                        }}
                      />
                      <div>
                        {item.name} - ${item.price} x {item.quantity}
                        <button
                          onClick={() => this.removeFromCart(item.id)}
                          style={{ marginLeft: '10px' }}
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              <h3>Total: ${this.calculateTotalPrice().toFixed(2)}</h3>
            </div>
          </div>
        );
      }
    }
    export default ShoppingCart;