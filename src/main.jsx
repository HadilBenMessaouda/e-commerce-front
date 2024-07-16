import React from 'react';
<<<<<<< HEAD
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
=======
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { createRoot } from 'react-dom/client';

// Create a client
const queryClient = new QueryClient();

// Use createRoot to render the app
createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <Router>
      <App />
    </Router>
  </QueryClientProvider>
>>>>>>> debaeb0de48aaf6833685f6a8880307de4435374
);
