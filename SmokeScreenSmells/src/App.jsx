import { useState } from 'react'
import './App.css'
import { Scene1 } from './smokescreen1.jsx'
import { Scene2 } from './Akatray.jsx'



function App() {
  

  return (
    <>
      <nav id="header">
        <div>
            <img src={'/logo.jpeg'} className="logo" alt="Smokescreen Logo" />
        </div>
        <ul>
          <li>Products</li>
          <li>Services</li>
          <li>Gallery</li>
        </ul>
      </nav>

      <div id="canvases">
        <div id="canvas-container1">
          <Scene1 />
          <p id="redSS"> RedPuffer: $9.99 </p>
          <button id="button1">Add To Cart</button>
        </div>
        <div id="canvas-container1">
          <Scene2 />
          <p>Rolling Tray: $19.99</p>
          <button id="button1">Add To Cart</button>
        </div>
      </div>
    </>
  )
}

export default App
