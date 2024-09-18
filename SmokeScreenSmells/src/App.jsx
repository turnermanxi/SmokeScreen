import { useState } from 'react'
import './App.css'
import { Scene1 } from './smokescreen1.jsx'
import { Scene2 } from './Akatray.jsx'
import { Logoscene } from './logo.jsx'



function App() {
  

  return (
    <>
      <nav id="header">
      <div id="canvas2">
            <Logoscene />
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
