import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Starterkit } from './Startkit';
import RootLayout from './RootLayout';
import Terms from './Terms.jsx';
import App from './App';
import About from './About';
import ProductList from './ProductList.jsx';
import { CartProvider } from './cartcontext';
import BlogPage from './blog.jsx';


// Create your router
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <App /> },
      { path: "about", element: <About />},
      { path: "startkit", element: <Starterkit />},
      { path: "terms", element: <Terms />},
      { path: "blog", element: <BlogPage />},
      { path: "store", element: <ProductList /> },
      { path: "*", element: <div>404 Not Found</div> },
    ],
  },
]);

// Render the application
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>
);
