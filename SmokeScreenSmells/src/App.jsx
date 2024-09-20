import { useState } from 'react'
import './App.css'
import { Scene1 } from './smokescreen1.jsx'
import { Scene2 } from './Akatray.jsx'
import { Logoscene } from './logo.jsx'
import ReactPlayer from 'react-player';



function App() {
  

  return (
    <>
      <body>
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
        <div id="video">
          <ReactPlayer
          url="/backgroundvideo.mov"
          playing={true}
          loop={true}
          width='100%'
          />
        </div>
        <div id="canvases">
          <div id="canvas-container1">
            <Scene1 />
            <p id="redSS"> RedPuffer: $9.99 </p>
            <button id="button1">SHOP</button>
          </div>
          <div id="canvas-container2">
            <Scene2 />
            <p>Rolling Tray</p>
            <button id="button1">3D SOLUTIONS</button>
          </div>
        </div>
      </body>

      <div id="copyright">
        <footer>
        Copyright © 2020 SmokeScreenSmells. All Rights Reserved.
        </footer>
      </div>

      
    </>
  )
}

export default App
