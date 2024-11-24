import { Link } from 'react-router-dom';
import { Logoscene } from './logo.jsx';
import CartIcon from './ShoppingIcon.jsx';

export function Navbar() {
  return (
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
  );
}
