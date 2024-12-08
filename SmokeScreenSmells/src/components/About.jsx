import React from 'react';
import '../CSS/About.css'; // Custom CSS for the About component

const About = () => {
    return (
        <>
        <div className="about-container">
            <div className="about-content">
                <h1 className="about-title">About</h1>
                <p className="about-description">
                Smokescreens is the leading solution for managing second-hand smoke, offering unmatched performance, style, and discretion. Designed with both smokers and non-smokers in mind, Smokescreens filters second-hand smoke while infusing the air with pleasant, long-lasting scents. Backed by a utility patent filed in 2019, our innovative design ensures superior functionality, making it the most effective and convenient scented smoke filter available on the market today.

                </p>
                <p className="about-mission">
                    <strong>Our Mission:</strong> to redefine the smoking experience by making it more considerate and enjoyable for everyone. Smokescreens empowers smokers to reduce their environmental impact while fostering healthier, fresher spaces for those around them. Whether you're at home, outdoors, or on the go, our filters are designed to seamlessly blend utility and style, offering a discreet yet powerful solution to second-hand smoke concerns.
                </p>
                <p class="about-mission">


                <strong>Utility Patent-Protected Innovation:</strong> In 2019, Smokescreens secured a utility patent for its groundbreaking approach to second-hand smoke filtration. This patent ensures our product offers an unparalleled combination of effectiveness and user-friendliness.

Unmatched Effectiveness: Smokescreens uses cutting-edge filtration technology to trap smoke particles and replace them with clean, fragrant air. Our wide range of signature scents is crafted to provide a delightful experience while neutralizing unpleasant odors.

Stylish and Discreet Design: Smokescreens products are sleek, portable, and easy to use. They are designed to fit seamlessly into any lifestyle, offering smokers an elegant way to enjoy their habit while minimizing the impact on those around them.

Proven Results: Thousands of satisfied customers trust Smokescreens to deliver reliable performance. Our filters are rigorously tested to ensure they exceed expectations, making them the best choice for second-hand smoke filtration.
                </p>

                
                <p class='about-description'>
                When you choose Smokescreens, you’re choosing the best in innovation, design, and performance. Experience the difference that patented technology can make. Say goodbye to lingering smoke odors and hello to cleaner, fresher air.

<h1 className= 'about-title'>Smokescreens: The ultimate solution for second-hand smoke.</h1>
                </p>
                <div className="about-image-wrapper">
                    <img 
                        src="/productpan.jpg" 
                        alt="Team photo or product showcase" 
                        className="about-image"
                    />
                </div>
            </div>
        </div>
        </>
    );
};

export default About;
