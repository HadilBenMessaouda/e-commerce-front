import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';  // Import your Dashboard component
import './index.css';  // Import your global CSS

// Create a query client
const queryClient = new QueryClient();

// Define your routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

 
  // Add more routes as needed
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
