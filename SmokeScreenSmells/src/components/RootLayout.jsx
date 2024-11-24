// RootLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import Footer from './Copyright.jsx'

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />

    </>
  );
};

export default RootLayout;
