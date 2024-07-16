
<<<<<<< HEAD

import { Routes, Route } from 'react-router-dom';
=======
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NavAdmin from './components/NavAdmin';
>>>>>>> debaeb0de48aaf6833685f6a8880307de4435374
import Home from './components/HomePage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ProductAdd from './components/ProductAdd';
import ProtectedRoute from './components/ProtectedRoute';
<<<<<<< HEAD
import Dashboard from './components/Dashboard';

=======
import { AuthProvider } from './context/AuthContext';

const queryClient = new QueryClient();
>>>>>>> debaeb0de48aaf6833685f6a8880307de4435374

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <Router>
                   
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/signin" element={<SignIn />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/add-product" element={<ProtectedRoute element={<ProductAdd />} />} />
                        {/* Add other routes here */}
                    </Routes>
                </Router>
            </AuthProvider>
        </QueryClientProvider>
    );
}

<<<<<<< HEAD
  

    return (
                
                   
                    <Routes>
                        <Route path="/" element={<Dashboard />}>
                        <Route path="/signin" element={<SignIn />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/add-product" element={<ProtectedRoute element={<ProductAdd />} />} />
                        {/* Add other routes here */}
                        </Route>
                    </Routes>
                
    );
}

=======
>>>>>>> debaeb0de48aaf6833685f6a8880307de4435374
export default App;
