
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { createRoot } from 'react-dom/client';



// Create a client
const queryClient = new QueryClient();


// Wrap your app in QueryClientProvider and pass the client to it
createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
        <Router>
            <App />
        </Router>
    </QueryClientProvider>,
);
