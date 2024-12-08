// ObjModel.js
import React, { useEffect, useRef, useState } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

const ObjModel = ({ url, color }) => {
    const obj = useLoader(OBJLoader, url);
    const ref = useRef();
    const [scaleFactor, setScaleFactor] = useState(1); // State for scaling model

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

            // Rotate the model around the X and Y axis
            ref.current.rotation.y = Math.PI / 7.5; // 90 degrees in radians
            ref.current.rotation.x = Math.PI / -2;

            // Set the scale based on the model's bounding box size
            const scale = Math.min(40 / size.length(), 1); // Limit scaling to a max factor
            setScaleFactor(scale);

            obj.position.y += -10;
        }
    }, [obj, color]);

    useFrame(() => {
        if (ref.current) {
            // Rotate the object around the Z-axis
            ref.current.rotation.z += 0.02; // Adjust the rotation speed as needed
        }
    });

    return <primitive ref={ref} object={obj} scale={[scaleFactor, scaleFactor, scaleFactor]} />;
};

export function Meangreen2() {
    return (
        <Canvas
            camera={{ position: [0, 0, 10], fov: 50 }}
            style={{ width: '100%', height: '100%' }} // Ensure the canvas takes up the full available size
        >
            <ambientLight intensity={0.5} />
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
            <ObjModel url="/SSCentered2.obj" color="green" />
            <OrbitControls />
            <Environment preset="sunset" />
        </Canvas>
    );
};
