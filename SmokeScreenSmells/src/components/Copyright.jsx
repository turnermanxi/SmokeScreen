import React, { useState } from "react";


const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter a valid email address.");
      return;
    }

    try {

        const response = await fetch("https://smokescreenserver.onrender.com/api/newsletter/subscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

      if (response.ok) {
        setMessage("Thank you for subscribing!");
        setEmail(""); // Clear the input field
      } else {
        const errorData = await response.json();
        setMessage(
          errorData.error || "Something went wrong. Please try again later."
        );
      }
    } catch (error) {
      setMessage("Error: Unable to subscribe. Please try again.");
    }
  };

  return (
    <footer id="copyright" className="footer-container">
      <div className="footer-content">
        {/* Contact and Quick Links Section */}
        <div className="footer-section">
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:ct@smokescreensmells.com">ct@smokescreensmells.com</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/terms">Terms and Services</a></li>
          </ul>
        </div>

        {/* Payment Processors and Trust Badges */}
        <div className="footer-section">
          <h4>Our Partners</h4>
          <div className="badges">
            <img src="/mastercard.png" alt="MasterCard Logo" id='mastercard' />
            <img src="/americanexpress.png" alt="American Express Logo" className='badge'/>
            <img src="/visalogo.png" alt="Visa Logo" id="visalogo" />
          </div>
          <div className="badges">
            <img src="ecofriendly-badge-placeholder.png" alt="Eco-Friendly Badge" className="badge" />
            <img src="made-usa-badge-placeholder.png" alt="Made in the USA Badge" className="badge" />
            <img src="ssl-secure-badge-placeholder.png" alt="SSL Secure Badge" className="badge" />
          </div>
        </div>

        {/* Subscription Section */}
        <div className="footer-section">
          <h4>Subscribe to Our Newsletter</h4>
          <form onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Subscribe</button>
          </form>
          {message && <p className="subscription-note">{message}</p>}
          <p className="subscription-note">
            We respect your privacy. Your information will never be shared or sold.
          </p>
        </div>

        {/* Testimonials */}
        <div className="footer-section">
          <h4>Testimonials</h4>
          <h5>"The best 2nd hand smoke filter I've ever used!" - Edward Lao</h5>
          <h5>"SmokescreenSmells changed the game!" - Michelle Sanders</h5>
        </div>

        {/* Blog Feed */}
        <div className="footer-section">
          <h4>Blog</h4>
          <ul>
            <li><a href="/blog">"5 Ways to Improve Air Quality Indoors"</a></li>
            <li><a href="/blog">"How SmokescreenSmells Works: A Deep Dive"</a></li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="footer-bottom">
        <div className="footer-copyright">
          <h5>Copyright © {new Date().getFullYear()} SmokeScreenSmells. All Rights Reserved.</h5>
        </div>
        <div className="back-to-top">
          <a href="#top">Back to Top ↑</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
