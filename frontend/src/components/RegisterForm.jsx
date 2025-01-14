import React, { useState } from 'react';
import apiClient from '../api/axios';

const RegisterForm = ({ onSubmit }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await apiClient.post('/auth/register', { username, email, password });
            onSubmit(response.data);
            alert('Registration successful! You can now log in.');
        } catch (err) {
            console.error(err);
            setError('Registration failed! Please try again.');
        }
    };

    return (
        <div className="flex h-screen bg-gray-200">
            {/* Left Section - Yellow Background with Text Box */}

            {/* Right Section - Register Form */}
            <div
                className="flex-1 w-screen flex justify-center items-center"
                style={{ height: '100%' }}
            >
                <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                    <h2 className="text-left text-3xl mb-3 font-serif">Welcome to EventHive</h2>
                    <p className='text-left text-lg mb-3'>We're happy to have you here.</p>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <input
                                placeholder="Username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            />
                        </div>
                        <div>
                            <input
                                placeholder="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            />
                        </div>
                        <div>
                            <input
                                placeholder="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <button
                            type="submit"
                            className="w-full my-5 flex gap-4 items-center justify-center rounded-full bg-blue-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Register
                        </button>
                        <p className="text-center mt-4">
                            Already have an account?{' '}
                            <a href="/Login" className="text-blue-600 hover:underline">
                                Log In
                            </a>
                        </p>
                        <p className="text-xs text-center mt-4">
                            By registering, you agree to EventHive's Terms & Conditions and Privacy Policy.
                        </p>
                    </form>
                </div>
            </div>
            <div
                className="flex-1 w-screen bg-yellow-300 flex justify-center items-center"
                style={{ height: '100%' }}
            >
                <div className="p-8 rounded-lg text-center max-w-md ">
                    <h1 className="font-bold font-serif sm:text-[40px] text-[10px] text-left mt-12 text-black">
                        Seamless event planning at your fingertips. <br /> <br />
                        Manage every detail with simplicity and precision.
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;