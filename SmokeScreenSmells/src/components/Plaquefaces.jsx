import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ProductFace = ({ product, position, onClick }) => {
    const textureRef = useRef();
    const materialRef = useRef();

    useEffect(() => {
        if (!product) return; // Exit if product data hasn't loaded yet

        // Create a canvas for rendering text
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        // Set canvas size
        canvas.width = 256;
        canvas.height = 128;

        // Clear and set styles for drawing text
        context.clearRect(1, 1, canvas.width, canvas.height);
        context.fillStyle = 'white'; // Background for text clarity
        context.fillRect(1, 1, canvas.width, canvas.height);
        context.fillStyle = 'black';
        context.font = '20px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';

        // Draw product name and price, centered on the canvas
        context.fillText(product.name, canvas.width / 2, canvas.height / 3);
        context.fillText(`Price: $${product.price.toFixed(2)}`, canvas.width / 2, (canvas.height / 3) * 2);

        // Create a texture from the canvas and update it
        const texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        textureRef.current = texture;

        // Assign the texture to the material
        if (materialRef.current) {
            materialRef.current.map = texture; // Assign texture here to display on 3D face
            materialRef.current.needsUpdate = true;
        }
    }, [product]);

    // Render only when product data and texture are ready
    if (!product || !textureRef.current) return null;

    return (
        <mesh position={position} rotation={[0, Math.PI, 0]} onClick={onClick}>
            <planeGeometry args={[10, 10]} /> {/* The size of the face on which texture is applied */}
            <meshBasicMaterial 
                ref={materialRef}           // Reference to material for updating
                map={textureRef.current}     // Texture created from canvas, displays product data
                transparent={true} 
                opacity={1} 
            />
        </mesh>
    );
};

export default ProductFace;
