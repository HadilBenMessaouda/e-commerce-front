

import { Routes, Route } from 'react-router-dom';
import Home from './components/HomePage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ProductAdd from './components/ProductAdd';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';


function App() {

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

export default App;
