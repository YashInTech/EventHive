import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
    const handleLoginSubmit = async (credentials) => {
        // Handle login logic, e.g., call API to authenticate
        console.log(credentials);
    };

    return (
        <div>
            <LoginForm onSubmit={handleLoginSubmit} />
        </div>
    );
};

export default LoginPage;