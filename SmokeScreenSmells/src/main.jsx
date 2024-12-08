import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Starterkit } from './components/Startkit.jsx';
import RootLayout from './components/RootLayout.jsx';
import Terms from './components/Terms.jsx';
import App from './components/App.jsx';
import About from './components/About.jsx';
import ProductList from './components/ProductList.jsx';
import { CartProvider } from './components/cartcontext.jsx';
import BlogPage from './components/blog.jsx';


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
