

import { Routes, Route } from 'react-router-dom';
import Home from './components/HomePage';
import SignIn from './components/SignIn';
import Signup from './components/SignUp';
import ProductAdd from './components/ProductAdd';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';
import ProductList from './components/ProductList';



function App() {
  


  

    return (
                
                   
                    <Routes>
                        <Route path="/" element={<SignIn />}/>
                        {/* <Route path="/signin" element={<SignIn />} /> */}
                        <Route path="/dash" element={<Dashboard />} />

                        <Route path="/list" element={<ProductList />} />

                        <Route path="/signup" element={<Signup />} />
                        <Route path="/add-product" element={<ProtectedRoute element={<ProductAdd />} />} />
                        {/* Add other routes here */}
                        {/* </Route> */}
                    </Routes>
                
    );
}

export default App;
