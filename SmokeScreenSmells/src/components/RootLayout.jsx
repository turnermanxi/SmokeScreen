// RootLayout.jsx
import React, { useState, useEffect, useContext, createContext } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import Footer from './Copyright.jsx';
import AgeVerificationPopup from './AgeVerification.jsx';

const PopupContext = createContext();

export const usePopup = () => useContext(PopupContext);

const RootLayout = ({children}) => {
  const [popupMessage, setPopupMessage] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const showPopup = (message) => {
    setPopupMessage(message);
    setIsPopupVisible(true);

    // Automatically hide the popup after 2 seconds
    setTimeout(() => {
      setIsPopupVisible(false);
    }, 2000);
  };


  return (
    <>
    <PopupContext.Provider value={{ showPopup }}>
      <AgeVerificationPopup />
      <Navbar />
      <Outlet />
      <Footer />
      
      <div>
        {children}
        {isPopupVisible && (
          <div className="popup-message">
            {popupMessage}
          </div>
        )}
      </div>
    </PopupContext.Provider>

    </>
  );
};

export default RootLayout;
