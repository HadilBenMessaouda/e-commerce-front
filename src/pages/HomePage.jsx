// import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../services/authService';

function Home() {
    const user = getCurrentUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/signin');
    };

    return (
        <div className="min-h-full flex flex-col items-center justify-center py-12 px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-4">Welcome to Our Application</h1>
            {user ? (
                <>
                    <p className="text-xl">Hello, {user.username}!</p>
                    <button
                        onClick={handleLogout}
                        className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md"
                    >
                        Logout
                    </button>
                </>
            ) : (
                <>
                    <p className="text-xl">You are not logged in.</p>
                    <Link to="/signin" className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md">
                        Sign In
                    </Link>
                    <Link to="/signup" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md">
                        Sign Up
                    </Link>
                </>
            )}
        </div>
    );
}

export default Home;
