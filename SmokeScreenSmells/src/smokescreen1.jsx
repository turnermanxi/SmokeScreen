// ObjModel.js
import React, { useEffect, useRef } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/Addons.js';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

const ObjModel = ({url, color}) => {
    const obj = useLoader(OBJLoader, url);
    const ref = useRef();

    useEffect(() => {
        if (obj && ref.current) {
          // Apply transformations only if obj and ref.current are valid
          ref.current.traverse(child => {
            if (child.isMesh) {
              child.material = new THREE.MeshStandardMaterial({ color });
            }
          });
    
          // Center the model
          const box = new THREE.Box3().setFromObject(obj);
          const size = box.getSize(new THREE.Vector3());
          const center = box.getCenter(new THREE.Vector3());
    
          obj.position.sub(center); // Center the model
          ref.current.position.copy(obj.position); // Set the position of the ref object
          
    
          // Rotate the model 90 degrees around the Y-axis
          ref.current.rotation.y = Math.PI / 2; // 90 degrees in radians

          const scaleFactor = 650 / size.length();
          ref.current.scale.set(scaleFactor, scaleFactor, scaleFactor);

          obj.position.y += 800;
          obj.position.z += 100;
          obj.position.x += -100;
        }
      }, [obj, color]);

      //useFrame(() => {
        //if (ref.current) {
          // Rotate the object around the X-axis
         // ref.current.rotation.y += 0.02; // Adjust the rotation speed as needed
       // }
     // });


    return <primitive ref={ref} object={obj} />;
    
};

export function Scene1() {

    
    return (
        <Canvas
        camera={{ position: [-75, 950, 55], fov: 50 }}
        >
            
            <ambientLight intensity = {.5} />
            <directionalLight
             position={[10, 10, 5]}
             intensity={3}
             castShadow
             shadow-mapSize-width={1024}
             shadow-mapSize-height={1024}
             shadow-camera-near={0.5}
             shadow-camera-far={500}
             shadow-camera-left={-50}
             shadow-camera-right={50}
             shadow-camera-top={50}
             shadow-camera-bottom={-50}
            />

            <pointLight position={[10, 10, 10]} intensity={1} />
            <ObjModel url="/SmokeScreenC2.obj" color='red'/>
            <OrbitControls />
            
        </Canvas>
        
    );
};


