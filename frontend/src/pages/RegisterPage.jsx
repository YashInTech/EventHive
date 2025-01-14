import React from 'react';
import RegisterForm from '../components/RegisterForm';

const RegisterPage = () => {
    const handleRegisterSubmit = async (userData) => {
        // Handle register logic, e.g., call API to register the user
        console.log(userData);
    };

    return (
        <div>
            <RegisterForm onSubmit={handleRegisterSubmit} />
        </div>
    );
};

export default RegisterPage;