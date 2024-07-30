

import { Routes, Route } from 'react-router-dom';

import ProductList from './components/ProductList';
import SignIn from './pages/SignIn';
import Dashboard from './components/Admin/Dashboard';
import Signup from './pages/SignUp';
import ProtectedRoute from './pages/ProtectedRoute';
import ProductAdd from './components/Admin/ProductAdd';
import Products from './components/User/Products';



function App() {
  


  

    return (
                   
                    <Routes>
                        <Route path="/products" element={<Products />}/>

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
