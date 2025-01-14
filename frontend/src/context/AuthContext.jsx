import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check for token in cookies on app load
        const token = Cookies.get('token');
        if (token) {
            // Decode token to extract user information (if needed)
            const storedUser = JSON.parse(Cookies.get('user'));
            setUser(storedUser);
        } else {
            navigate('/login'); // Redirect to login if no token is found
        }
    }, [navigate]);

    const login = (userData) => {
        setUser(userData);
        Cookies.set('token', userData.token, { expires: 1 }); // Save token in cookie for 24 hours
        Cookies.set('user', JSON.stringify(userData), { expires: 1 }); // Save user info in cookie
        navigate('/dashboard'); // Redirect to dashboard after login
    };

    const logout = () => {
        setUser(null);
        Cookies.remove('token');
        Cookies.remove('user');
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
