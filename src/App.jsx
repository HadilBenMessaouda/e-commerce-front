

import { Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ProductAdd from './components/Admin/ProductAdd';
import ProtectedRoute from './pages/ProtectedRoute';
import Dashboard from './components/Admin/Dashboard';


function App() {

    return (
                
                   
                    <Routes>
                        <Route path="/" element={<SignIn/>}>
                        <Route path="/signup" element={<SignUp navigate={Navigate} />} /> {/* Ensure navigate is passed */}
                        {/*<Route path="/add-product" element={<ProtectedRoute element={<ProductAdd />} />} />*/}
                        <Route path="/addproduct" element={<ProductAdd />} />
                        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />

                        {/* Add other routes here */}
                        </Route>
                    </Routes>
                
    );
}

export default App;
