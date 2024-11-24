import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const BlogPage = () => {

    useEffect(() => {
        fetch('http://localhost:3000/api/blogs')
            .then(response => response.json())
            .then(data => setBlogs(data))
            .catch(error => console.error('Error fetching blogs:', error));
    }, []);
    
  const blogPosts = [
    {
      id: 1,
      title: 'Why Smokescreens Work So Well',
      excerpt: 'Discover the science and ingenuity behind our patented 2nd hand smoke filter...',
      image: '/images/blog1.jpg',
      slug: 'why-smokescreens-work-so-well',
    },
    {
      id: 2,
      title: 'How to Use Smokescreens Effectively',
      excerpt: 'Maximize your experience with our step-by-step guide...',
      image: '/images/blog2.jpg',
      slug: 'how-to-use-smokescreens',
    },
    // Add more blog posts here
  ];

  return (
    <div className="blog-page">
      <h1>Our Blog</h1>
      <div className="blog-grid">
        {blogPosts.map(post => (
          <div key={post.id} className="blog-card">
            <img src={post.image} alt={post.title} />
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
            <Link to={`/blog/${post.slug}`} className="btn-read-more">
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
