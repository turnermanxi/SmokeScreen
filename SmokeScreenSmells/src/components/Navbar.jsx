import { Link } from 'react-router-dom';
import { Logoscene } from './logo.jsx';
import CartIcon from './ShoppingIcon.jsx';
import logo1 from "../images/facebookLogo.jpeg";
import logo2 from "../images/tiktok-icon2.jpg";
import logo3 from "../images/Instagram_logo_2016.jpeg";
import { useEffect, React, useState } from 'react';

export function Navbar() {

  const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsVisible(true);
            setTimeout(() => {
                setIsVisible(false);
            }, 10000); // Message visible for 3 seconds
        }, 10000); // Trigger every 10 seconds

        return () => clearInterval(interval);
    }, []);

  return (
    <>
    <div className="navheader">
      <nav id="header">
        <ul>
          <li id="products"><Link to="/">Home</Link></li>
          <li id="services"><Link to="/store">Shop</Link></li>
      
          <div id="canvas4">
            <Logoscene />
          </div>
      
          <li id="gallery"><Link to="/startkit">Kit</Link></li>
          <li id="about"><Link to="/about">About</Link></li>
          <li>
            <CartIcon />
          </li>
        </ul>
      </nav>
    </div>

    <div
            style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                background: 'rgba(0, 0, 0, 0.8)', // Semi-transparent black
                color: '#fff',
                padding: '10px 20px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 'bold',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
                transition: 'opacity 0.5s ease-in-out',
                opacity: isVisible ? 1 : 0,
                zIndex: 9999,
                pointerEvents: 'none', // Prevent interaction
            }}
        >
            If 3D models get too big or disappear, try refreshing the page.
        </div>
    <div className="socials">
          <a href="https://www.facebook.com/smokescreensmells" target="_blank" rel="noopener noreferrer"><img src={logo1} id="fbLogo"  style={{ width: '1.5rem', height: '1.5rem', cursor: 'pointer' }}/></a>
          <a href="https://www.tiktok.com/@chrislrey_" target="_blank" rel="noopener noreferrer"><img src={logo2} id="tikTok"  style={{ width: '1.5rem', height: '1.5rem', cursor: 'pointer' }}/></a>
          <a href="https://www.instagram.com/smokescreensmells/" target="_blank" rel="noopener noreferrer"><img src={logo3} id="igLogo"  style={{ width: '1.5rem', height: '1.5rem', cursor: 'pointer' }}/></a>
        </div>
    </>
    
    

    
  );
}
