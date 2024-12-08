import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Scene1 } from './smokescreen1';
import { Scene2 } from './Akatray';
import { Pinkpuffer } from './pinkpuffer';
import { Bluemonsoon } from './bluemonsoon';
import { Meangreen } from './meangreen';
import { Smokebomb } from './smokebomb'
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS for layout
import '../CSS/App.css';
import '../CSS/introsection.css';

const ContentBelowShelf = ({ products }) => {
  
  return (
    <section>
      <div className="container2">
        {/* Heading Section */}
        <div className="row mb-4">
          <div className="col text-center">
            <h2>Explore Our Products</h2>
            <p className="lead">Check out the awesome products we offer on the shelf above.</p>
          </div>
        </div>

        {/* Display product cards */}
        <div className="row">
          {products.slice(0, 3).map((product, index) => (
            <div key={product.id} className="col-md-4">
              <div className="card h-100 text-center">
                {/* Use a wrapper component to control scene rendering */}
                <SceneWrapper index={index} />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">${product.price}</p>
                  <Link to='/startkit' className="btn btn-primary">
                    Try Kit
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section>
        <div className="container" data-aos="fade-up">
          <div className="row gx-0">
            <div className="col-lg-6 d-flex align-items-center" data-aos="zoom-out" data-aos-delay="200">
              <img
                src="/IMG_1837.gif"
                className="img-fluid"
                alt="smokescreens 3d printer"
              />
            </div>
            <div className="col-lg-6 d-flex flex-column justify-content-center" data-aos="fade-up" data-aos-delay="200">
              <div className="content">
                <h3>Who We Are</h3>
                <h2>
                  SmokescreenSmells offers eco-friendly, 3D-printed smoke filters designed to eliminate second-hand smoke and odors. Our sleek, customizable filters, formerly known as sploofs, provide discreet and effective odor control, allowing you to enjoy smoking without the lingering smell. Whether you're at home or on the go, our filters ensure a fresh, odor-free experience.
                </h2>
                <p>
                  Made with sustainable materials, SmokescreenSmells products combine style and functionality. Upgrade your smoking routine with our modern filters, crafted for durability and performance. Explore our collection today to experience smoke filtering reimagined.
                </p>
                <div className="text-center text-lg-start">
                  <Link to='/about' className="btn-read-more d-inline-flex align-items-center justify-content-center align-self-center">
                    <span>Read More</span>
                    <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
        </div>
      </div>
      
      </section>
    </section>
  );
};

// Create a wrapper component to manage the scene rendering
const SceneWrapper = ({ index }) => {
  switch (index) {
    case 0:
      return <Pinkpuffer />;
    case 1:
      return <Meangreen />;
    case 2:
      return <Bluemonsoon />;
    default:
      return null;
  }
};

export default ContentBelowShelf;


