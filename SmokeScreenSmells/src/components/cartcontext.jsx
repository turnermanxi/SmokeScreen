import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);

    const addToCart = (item) => {
        console.log("Before Adding:", cartItems);
        setCartItems((prevItems) => {
            const updatedItems = [...prevItems, item];
            console.log("Updated Cart Items:", updatedItems);
            return updatedItems;
        });
        setTotalAmount((prevTotal) => prevTotal + item.price);
        setCartCount((prevCount) => prevCount + 1);
    };

    const removeFromCart = (item) => {
        setCartItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
        setTotalAmount((prevTotal) => prevTotal - item.price);
        setCartCount((prevCount) => prevCount - 1);
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                totalAmount,
                cartCount,
                addToCart,
                removeFromCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
