import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';  // Import your Dashboard component
import './index.css';  // Import your global CSS
import SignIn from './pages/SignIn';
import Dashboard from './components/Admin/Dashboard';
import Signup from './pages/SignUp';

// Create a query client
const queryClient = new QueryClient();

// Define your routes
const router = createBrowserRouter([
  {
    path: "/*",
    element: <App />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "dashboard",
    element: <Dashboard/>,
  }

 
  // Add more routes as needed
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
