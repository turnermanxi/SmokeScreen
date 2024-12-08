import React, { useEffect, useRef, useState } from 'react';
import { useLoader, Canvas } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import * as THREE from 'three';
import { gsap } from 'gsap'; 
import { useNavigate } from 'react-router-dom';

// ObjModel component for rendering the 3D model with colors
const ObjModel = ({ url, position, onZoomClick }) => {
    const obj = useLoader(OBJLoader, url, (loader) => {
        
        loader.manager.onLoad = () => setLoading(false);
    });
    const ref = useRef();
    const navigate = useNavigate(); // Get navigate function

    useEffect(() => {
        if (obj && ref.current) {
            ref.current.traverse((child) => {
                if (child.isMesh) {
                    // Apply initial emissive material to create glowing effect
                    child.material = new THREE.MeshStandardMaterial({ 
                        emissive: new THREE.Color(0x00ff00), 
                        emissiveIntensity: 0.1 // Initial low intensity
                    });
                    // Custom color logic for different object names
                    if (child.name === 'Shelf') {
                        child.material.color.set('white');
                    } else if (['Body33', 'Body32', 'Body34', 'Body24'].includes(child.name)) {
                        child.material.color.set('red');
                        child.material.emissive.set('red');
                        gsap.to(child.material, {
                            emissiveIntensity: 1,
                            duration: .8, // Duration of each fade-in/fade-out
                            repeat: -1, // Infinite repetition
                            yoyo: true, // Make it reverse for a fade-out effect
                            ease: "power1.inOut" // Ease for smooth animation
                          
                            
                        }); // Apply glowing green effect
                        child.userData = { id: 'redB', isBody: true, zoomTarget: { x: -50, y: 5, z: 0 }};
                    } else if (['Body32 (1)', 'Body33 (1)', 'Body34 (1)', 'Body24:1'].includes(child.name)) {
                        child.material.color.set('yellow');
                        child.material.emissive.set('yellow'); 
                        gsap.to(child.material, {
                            emissiveIntensity: 1,
                            duration: .8, // Duration of each fade-in/fade-out
                            repeat: -1, // Infinite repetition
                            yoyo: true, // Make it reverse for a fade-out effect
                            ease: "power1.inOut" // Ease for smooth animation
                        });
                        child.userData = { id: 'yellowB', isBody: true, zoomTarget: { x: 0, y: 5, z: 0 }};
                    } else if (['Body32 (1) (1)', 'Body33 (1) (1)', 'Body34 (1) (1)', 'Body24:2'].includes(child.name)) {
                        child.material.color.set('blue');
                        child.material.emissive.set('blue'); 
                        gsap.to(child.material, {
                            emissiveIntensity: 1,
                            duration: .8, // Duration of each fade-in/fade-out
                            repeat: -1, // Infinite repetition
                            yoyo: true, // Make it reverse for a fade-out effect
                            ease: "power1.inOut" // Ease for smooth animation                            
                        });
                        child.userData = { id: 'blueB', isBody: true, zoomTarget: { x: 50, y: 5, z: 0 } };
                    } else if (['Body41', 'Body46', 'Body47', 'Body48', 'Body49'].includes(child.name)) {
                        child.material.color.set('gold');
                        child.userData = { isGold: true };
                    } else if (['Body46 (1)', 'Body39'].includes(child.name)) {
                        child.material.color.set('#1fddeb');
                        child.userData = { id: 'lightblueB', isBody: true, zoomTarget: { x: -50, y: 5, z: 0 }};
                    } else if (['Body46 (1) (1)', 'Body39 (1)'].includes(child.name)) {
                        child.material.color.set('green');
                        child.userData = { id: 'greenB', isBody: true, zoomTarget: { x: 0, y: 5, z: 0 }};
                    } else if (['Body46 (1) (1) (1)', 'Body39 (1) (1)'].includes(child.name)) {
                        child.material.color.set('pink');
                        child.userData = { id: 'pinkB', isBody: true, zoomTarget: { x: 50, y: 5, z: 0 } };
                    } else if (child.name.includes('Body4 (1):1')) {
                        child.material.color.set('black');
                        child.material.emissive.set('black');
                        gsap.to(child.material, {
                            emissiveIntensity: 1,
                            duration: .8, // Duration of each fade-in/fade-out
                            repeat: -1, // Infinite repetition
                            yoyo: true, // Make it reverse for a fade-out effect
                            ease: "power1.inOut" // Ease for smooth animation
                        });
                        child.userData = { id: 'blackB', isBody: true, zoomTarget: { x: 30, y: -20, z: 0 } };
                    } else if (child.name.includes('Body4 (1):2')) {
                        child.material.color.set('purple');
                        child.userData = { id: 'purpleB', isBody: true };
                    } else if (['Body116', 'Body84', 'Body115', 'Body85', 'Body114', 'Body86',
                        'Body113', 'Body87', 'Body112', 'Body88', 'Body111', 'Body89', 'Body110',
                        'Body91', 'Body92', 'Body107', 'Body93', 'Body109', 'Body106', 'Body239', 
                        'Body94', 'Body238', 'Body105', 'Body105', 'Body104', 'Body103', 'Body102', 'Body99',
                        'Body108', 'Body241','Body242', 'Body96',	
                        'Body100', 'Body101', 'Body97', 'Body237','Body95', 'Body238', 'Body240', 'Body50',	
                        'Body51','Body52', 'Body53','Body54','Body55','Body56',	
                        'Body59','Body73','Body57','Body76','Body61','Body70','Body63','Body69','Body68','Body67',	
                        'Body58','Body232','Body233','Body234','Body66','Body65','Body64',	
                        'Body235','Body62','Body71','Body72','Body236','Body60','Body74',	
                        'Body75','Body77','Body78','Body79','Body80','Body81','Body82','Body83',
                        'Body117','Body118','Body25 (2)','Body120','Body121','Body122',	
                        'Body123','Body124','Body31 (2)','Body32 (2)','Body33 (2)','Body34 (2)',	
                        'Body129','Body130','Body131','Body132','Body133','Body134','Body136',	
                        'Body137','Body138','Body139','Body140','Body141','Body142','Body144',	
                        'Body145','Body146','Body147','Body148','Body149','Body243','Body244',	
                        'Body245','Body246','Body34 (2) (1)', 
                        'Body150', 'Body151', 'Body152', 'Body153', 'Body154', 'Body155',
                        'Body156', 'Body157', 'Body158', 'Body159', 'Body160', 'Body161',
                        'Body162', 'Body163', 'Body164', 'Body165', 'Body166', 'Body167',
                        'Body168', 'Body169', 'Body170', 'Body171', 'Body172', 'Body173',
                        'Body174', 'Body175', 'Body176', 'Body177', 'Body178', 'Body179',
                        'Body180', 'Body181', 'Body182', 'Body183', 'Body184',
                        'Body185', 'Body186', 'Body187', 'Body188', 'Body189', 'Body190',
                        'Body191', 'Body192', 'Body193', 'Body194', 'Body195', 'Body196',
                        'Body197', 'Body198', 'Body199', 'Body200', 'Body201', 'Body202',
                        'Body203', 'Body204', 'Body205', 'Body206', 'Body207', 'Body208',
                        'Body209', 'Body210', 'Body211', 'Body212', 'Body213', 'Body214',
                        'Body215', 'Body216', 'Body217', 'Body218', 'Body219'

                    ].includes(child.name)) {
                        child.material.color.set('#080707');
                        child.material.emissive.set('black');
                        gsap.to(child.material, {
                            emissiveIntensity: 1,
                            duration: .8, // Duration of each fade-in/fade-out
                            repeat: -1, // Infinite repetition
                            yoyo: true, // Make it reverse for a fade-out effect
                            ease: "power1.inOut" // Ease for smooth animation
                        });
                    }
                    
                }
            });

            // Center and scale the model
            const box = new THREE.Box3().setFromObject(obj);
            const size = box.getSize(new THREE.Vector3());
            const center = box.getCenter(new THREE.Vector3());

            obj.position.sub(center); // Center the model
            ref.current.position.copy(obj.position);

            const scaleFactor = 0.5; // Adjust as needed for size
            ref.current.scale.set(scaleFactor, scaleFactor, scaleFactor);

            ref.current.rotation.z = Math.PI;
            ref.current.position.set(position.x, position.y, position.z);
        }
        
    }, [obj, position]);



    return (
        <primitive
            ref={ref}
            object={obj}
            onPointerDown={(e) => {
                e.stopPropagation(); // Prevents the event from bubbling up to other objects
                const clickedMesh = e.object;
                if (clickedMesh.userData.zoomTarget) {
                    onZoomClick(clickedMesh.userData.zoomTarget);
                }

                // Check if the clicked object is gold and navigate
                if (clickedMesh.userData.isGold) {
                    navigate('/startkit'); // Navigate to the StartKit page if the object is gold
                }
            }}
        />
    );
};

// Shelfscene component with GSAP zoom toggle
export function Shelfscene() {
    const originalPosition = [0, 45, 80];
    const [loading, setLoading] = useState(true);
    const originalRotation = [-Math.PI / 6, 0, 0];
    const [fov, setFov] = useState(55); // Default fov
    const [isZoomed, setIsZoomed] = useState(false);
    const cameraRef = useRef();
    const [objRefs, setObjRefs] = useState({}); // Store references to objects

    const handleZoomClick = (worldPosition) => {
        if (!isZoomed) {
            // Smooth zoom-in animation to focus on the clicked object
            gsap.to(cameraRef.current.position, {
                x: worldPosition.x,
                y: worldPosition.y + 25, // Offset to focus camera on object
                z: worldPosition.z + 55, // Adjust zoom distance
                duration: 2,
                onUpdate: () => {
                    cameraRef.current.lookAt(worldPosition.x, worldPosition.y + 15, worldPosition.z);
                },
            });
        } else {
            // Smooth zoom-out animation to return to original position
            gsap.to(cameraRef.current.position, {
                x: originalPosition[0],
                y: originalPosition[1],
                z: originalPosition[2],
                duration: 2,
                onUpdate: () => {
                    cameraRef.current.lookAt(0, 0, 0); // Ensure camera resets its look-at
                },
            });
        }
        setIsZoomed(!isZoomed);
    };


    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 480) {
                setFov(50); // Adjust fov for smaller screens (mobile)
                if (objRefs.current) objRefs.current.position.set(1, 4, 0);
            } else if (window.innerWidth <= 768) {
                setFov(50); // Slightly smaller fov for tablets
                if (objRefs.current) objRefs.current.position.set(1, 4, 0);
            } else if (window.innerWidth <= 1024) {
                setFov(95);
                if (objRefs.current) objRefs.current.position.set(1, 30, 0);
            } else {
                setFov(55); // Keep fov at 55 as the default for larger screens
            }
        };

        window.addEventListener('resize', handleResize);

        // Initial resize call
        handleResize();

        // Cleanup on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        // Set a timeout to hide loading message after 4 seconds
        const timer = setTimeout(() => {
            setLoading(false);
        }, 4000); // 4 seconds

        // Cleanup the timer on unmount
        return () => clearTimeout(timer);
    }, []);



    return (
        <div className='loading-content'>
            {/* Loading Message */}
            {loading && (
                <div className='loading-message'>
                    Loading your Interactive Shelf...
                </div>
            )}
            

            {/* Canvas for 3D Scene */}
        <div id="canvases">
            <Canvas
                camera={{ position: originalPosition, fov: fov, rotation: originalRotation }}
                onCreated={({ camera }) => (cameraRef.current = camera)} // Set camera ref
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={3} castShadow />
                {/* Shelf with color logic */}
                <ObjModel url="/ShelfU.obj" position={{ x: 0, y: 0, z: 0 }} onZoomClick={handleZoomClick} setObjRefs={setObjRefs} />
            </Canvas>
        </div>
        </div>
    );
}

