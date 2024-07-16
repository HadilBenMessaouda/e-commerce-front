import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getCurrentUser, logout } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const user = getCurrentUser();
        setUser(user);
    }, []);

    const handleLogout = () => {
        logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
